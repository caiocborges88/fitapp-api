import os
import uvicorn
import psycopg2
from psycopg2 import pool
from fastapi import FastAPI, Request
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
from google import genai
from google.genai import types

# 1. Carrega as chaves do .env
load_dotenv()

# NOVO: Validação Fail-Fast de Variáveis de Ambiente
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")

if not GEMINI_KEY or not DATABASE_URL:
    raise RuntimeError("CRÍTICO: Variáveis de ambiente GEMINI_API_KEY ou DATABASE_URL ausentes no servidor!")

# Inicialização do novo cliente oficial
client = genai.Client(api_key=GEMINI_KEY)

# Criação do Pool Global de Conexões (1 a 20 conexões simultâneas)
try:
    db_pool = psycopg2.pool.SimpleConnectionPool(1, 20, DATABASE_URL)
except Exception as e:
    print(f"❌ Erro crítico ao criar o pool de conexões: {e}")
    exit(1)

# 2. Conecta no Supabase e cria as tabelas caso não existam
def iniciar_banco_nuvem():
    conn = None
    try:
        conn = db_pool.getconn() # Empréstimo do pool
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS treinos (
                id SERIAL PRIMARY KEY,
                data_treino TEXT,
                treino_tipo TEXT,
                exercicio TEXT,
                serie INTEGER,
                peso REAL,
                reps INTEGER
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS album (
                id SERIAL PRIMARY KEY,
                sticker_id INTEGER UNIQUE,
                data_desbloqueio TEXT
            )
        ''')
        
        conn.commit()
        cursor.close()
        print("✅ Conectado ao Supabase! Tabelas verificadas e prontas.")
    except Exception as e:
        print(f"❌ Erro ao inicializar tabelas: {e}")
    finally:
        if conn:
            db_pool.putconn(conn) # Devolve ao pool

# Executa a verificação do banco ao ligar o app
iniciar_banco_nuvem()

# Inicializa o aplicativo
app = FastAPI(title="FitApp API")

# NOVO: Amarração de Caminhos Absolutos para Produção
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

class ExercicioLog(BaseModel):
    exercise: str
    set: int
    kg: float
    reps: int

class TreinoLog(BaseModel):
    date: str
    tipo: str
    data: List[ExercicioLog]

class ImportarTreinoRequest(BaseModel):
    texto: str

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse(request=request, name="base.html")

@app.post("/api/salvar-treino")
def salvar_treino(treino: TreinoLog):
    conn = None
    try:
        conn = db_pool.getconn()
        cursor = conn.cursor()
        for item in treino.data:
            cursor.execute('''
                INSERT INTO treinos (data_treino, treino_tipo, exercicio, serie, peso, reps)
                VALUES (%s, %s, %s, %s, %s, %s)
            ''', (treino.date, treino.tipo, item.exercise, item.set, item.kg, item.reps))
        conn.commit()
        return {"status": "sucesso", "mensagem": f"Treino {treino.tipo} salvo com segurança nas nuvens!"}
    except Exception as e:
        if conn:
            conn.rollback()
        return {"status": "erro", "mensagem": str(e)}
    finally:
        if conn:
            cursor.close()
            db_pool.putconn(conn)

# Função isolada para buscar treinos sem bloquear o Event Loop
def _fetch_historico():
    conn = None
    try:
        conn = db_pool.getconn()
        cursor = conn.cursor()
        cursor.execute("SELECT data_treino, treino_tipo, exercicio, serie, peso, reps FROM treinos ORDER BY id DESC LIMIT 20")
        return cursor.fetchall()
    finally:
        if conn:
            cursor.close()
            db_pool.putconn(conn)

@app.get("/api/coach")
async def consultar_coach():
    try:
        # Executa a query de forma segura na thread pool
        registros = await run_in_threadpool(_fetch_historico)
    except Exception as e:
        return {"feedback": f"Erro ao acessar o banco: {str(e)}"}

    if not registros:
        return {"feedback": "Banco de dados em nuvem vazio. Salve um treino primeiro, capitão!"}

    historico_texto = "\n".join([f"Data: {r[0]} | Treino {r[1]} | {r[2]} - Série {r[3]}: {r[4]}kg x {r[5]}reps" for r in registros])
    
    prompt = f"""
    Você é um treinador pessoal de elite, focado em hipertrofia e biomecânica.
    Aqui está o extrato do meu histórico recente:
    {historico_texto}
    
    Faça uma análise rápida (máximo 3 frases). Destaque o volume/carga e sugira um ajuste.
    Tom: rigoroso, mas encorajador.
    """

    try:
        response = await client.aio.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )
        return {"feedback": response.text}
    except Exception as e:
        return {"feedback": f"Erro na IA: {str(e)}"}

@app.post("/api/importar-treino-ia")
async def importar_treino_ia(req: ImportarTreinoRequest):
    prompt = f"""
    Você é um analisador JSON de periodização de treinos. O usuário enviará um texto contendo uma rotina completa (múltiplos dias ou letras).
    Sua missão é fatiar esse texto em treinos individuais e extrair os exercícios de cada um.
    Cardios e abdominais descritos soltos no final (ex: "20 min cardio") devem ser inseridos como o último exercício daquele treino, com séries = 1 e repetições = o tempo ou instrução.

    Retorne APENAS um array JSON válido estruturado exatamente assim:
    [
      {{
        "nome_treino": "Segunda - Peito e Tríceps",
        "exercicios": [
          {{"nome": "Supino reto", "series": "4", "repeticoes": "8-10"}},
          {{"nome": "Tríceps corda", "series": "3", "repeticoes": "12-15"}}
        ]
      }},
      {{
        "nome_treino": "Terça - Costas e Bíceps",
        "exercicios": [ ... ]
      }}
    ]
    
    Texto do usuário:
    {req.texto}
    """
    
    try:
        response = await client.aio.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return {"resultado": response.text}
    except Exception as e:
        print(f"Erro na extração IA: {e}")
        return {"resultado": "[]", "erro": str(e)}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)