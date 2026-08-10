import os
import uvicorn
import psycopg2
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
from google import genai

# 1. Carrega as chaves do .env
load_dotenv()
# Inicialização do novo cliente oficial
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
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
    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
        for item in treino.data:
            # PostgreSQL usa %s em vez de ?
            cursor.execute('''
                INSERT INTO treinos (data_treino, treino_tipo, exercicio, serie, peso, reps)
                VALUES (%s, %s, %s, %s, %s, %s)
            ''', (treino.date, treino.tipo, item.exercise, item.set, item.kg, item.reps))
        conn.commit()
        return {"status": "sucesso", "mensagem": f"Treino {treino.tipo} salvo com segurança nas nuvens!"}
    except Exception as e:
        if conn:
            conn.rollback() # Cancela a operação se der erro na metade
        return {"status": "erro", "mensagem": str(e)}
    finally:
        if conn:
            cursor.close()
            conn.close() # Garante o fechamento da conexão

@app.get("/api/coach")
async def consultar_coach():
    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
        # Busca os últimos 20 registros
        cursor.execute("SELECT data_treino, treino_tipo, exercicio, serie, peso, reps FROM treinos ORDER BY id DESC LIMIT 20")
        registros = cursor.fetchall()
    except Exception as e:
        return {"feedback": f"Erro ao acessar o banco: {str(e)}"}
    finally:
        if conn:
            cursor.close()
            conn.close() # Garante o fechamento da conexão

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
        # Padronizado para o modelo único da aplicação
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )
        return {"feedback": response.text}
    except Exception as e:
        return {"feedback": f"Erro na IA: {str(e)}"}

# --- NOVO SISTEMA DE IMPORTAÇÃO (FASE 4) ---
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

    Não use crases de formatação markdown. Não adicione texto, saudação ou explicação.
    
    Texto do usuário:
    {req.texto}
    """
    
    try:
        # Atualizado para a nova versão Flash de alto desempenho
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )
        
        # Filtro de higienização: remove aspas crases de formatação Markdown caso a IA desobedeça
        texto_limpo = response.text.replace("```json", "").replace("```", "").strip()
        
        # O front-end espera um objeto com a chave "resultado"
        return {"resultado": texto_limpo}
    except Exception as e:
        print(f"Erro na extração IA: {e}")
        return {"resultado": "[]", "erro": str(e)}

# --- NOVO: BLOCO DE INICIALIZAÇÃO NATIVA ---
if __name__ == "__main__":
    # Captura a porta dinâmica do Render ou usa 10000 como padrão de segurança
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)