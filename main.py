import os
import psycopg2
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import google.generativeai as genai

# 1. Carrega as chaves do .env
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Conecta no Supabase e cria as tabelas caso não existam
def iniciar_banco_nuvem():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
        
        # Cria a tabela de Treinos
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
        
        # Cria a tabela do Álbum (já deixamos pronta!)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS album (
                id SERIAL PRIMARY KEY,
                sticker_id INTEGER UNIQUE,
                data_desbloqueio TEXT
            )
        ''')
        
        conn.commit()
        cursor.close()
        conn.close()
        print("✅ Conectado ao Supabase! Tabelas verificadas e prontas.")
    except Exception as e:
        print(f"❌ Erro ao conectar no Supabase: {e}")

# Executa a verificação do banco ao ligar o app
iniciar_banco_nuvem()

# Inicializa o aplicativo
app = FastAPI(title="FitApp API")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class ExercicioLog(BaseModel):
    exercise: str
    set: int
    kg: float
    reps: int

class TreinoLog(BaseModel):
    date: str
    tipo: str
    data: List[ExercicioLog]

# NOVO: Classe para receber a string bruta do front-end
class ImportarTreinoRequest(BaseModel):
    texto: str

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse(request=request, name="base.html")

@app.post("/api/salvar-treino")
async def salvar_treino(treino: TreinoLog):
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    for item in treino.data:
        # PostgreSQL usa %s em vez de ?
        cursor.execute('''
            INSERT INTO treinos (data_treino, treino_tipo, exercicio, serie, peso, reps)
            VALUES (%s, %s, %s, %s, %s, %s)
        ''', (treino.date, treino.tipo, item.exercise, item.set, item.kg, item.reps))
    conn.commit()
    cursor.close()
    conn.close()
    return {"status": "sucesso", "mensagem": f"Treino {treino.tipo} salvo com segurança nas nuvens!"}

@app.get("/api/coach")
async def consultar_coach():
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    # Busca os últimos 20 registros
    cursor.execute("SELECT data_treino, treino_tipo, exercicio, serie, peso, reps FROM treinos ORDER BY id DESC LIMIT 20")
    registros = cursor.fetchall()
    cursor.close()
    conn.close()

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
        # Lembrando de usar o modelo definido na etapa anterior (ex: gemma-4-31b-it ou o modelo atual válido)
        model = genai.GenerativeModel("models/gemma-4-31b-it") 
        response = model.generate_content(prompt)
        return {"feedback": response.text}
    except Exception as e:
        return {"feedback": f"Erro na IA: {str(e)}"}

# --- NOVO SISTEMA DE IMPORTAÇÃO (FASE 4) ---
@app.post("/api/importar-treino-ia")
async def importar_treino_ia(req: ImportarTreinoRequest):
    prompt = f"""
    Você é um analisador JSON de treinos de academia. Extraia os exercícios do texto do usuário.
    Retorne APENAS um array JSON válido contendo objetos com as chaves exatas: 'nome', 'series' e 'repeticoes'.
    Não use crases de formatação markdown. Não adicione nenhum outro texto, saudação ou explicação.
    
    Texto do usuário:
    {req.texto}
    """
    
    try:
        # gemini-1.5-flash possui a menor latência para extração de dados
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        # O front-end espera um objeto com a chave "resultado" para aplicar o Regex
        return {"resultado": response.text}
    except Exception as e:
        print(f"Erro na extração IA: {e}")
        return {"resultado": "[]", "erro": str(e)}