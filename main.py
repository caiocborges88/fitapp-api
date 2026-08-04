import sqlite3
import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import google.generativeai as genai

# Carrega a chave do arquivo .env e configura o Gemini
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

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

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse(request=request, name="base.html")

@app.post("/api/salvar-treino")
async def salvar_treino(treino: TreinoLog):
    conn = sqlite3.connect("fitapp.db")
    cursor = conn.cursor()
    for item in treino.data:
        cursor.execute('''
            INSERT INTO treinos (data_treino, treino_tipo, exercicio, serie, peso, reps)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (treino.date, treino.tipo, item.exercise, item.set, item.kg, item.reps))
    conn.commit()
    conn.close()
    return {"status": "sucesso", "mensagem": f"Treino {treino.tipo} salvo!"}

@app.get("/api/coach")
async def consultar_coach():
    """Lê os últimos treinos do SQLite e pede uma análise ao Gemini."""
    conn = sqlite3.connect("fitapp.db")
    cursor = conn.cursor()
    # Pega os últimos 20 registros de exercícios feitos
    cursor.execute("SELECT data_treino, treino_tipo, exercicio, serie, peso, reps FROM treinos ORDER BY id DESC LIMIT 20")
    registros = cursor.fetchall()
    conn.close()

    if not registros:
        return {"feedback": "Você ainda não tem treinos salvos no banco de dados para eu analisar, capitão. Vá treinar!"}

    # Formata os dados para o prompt da IA
    historico_texto = "\n".join([f"Data: {r[0]} | Treino {r[1]} | {r[2]} - Série {r[3]}: {r[4]}kg x {r[5]}reps" for r in registros])
    
    prompt = f"""
    Você é um treinador pessoal de elite, focado em hipertrofia e biomecânica.
    Aqui está o extrato recente do banco de dados do meu aplicativo de treino:
    {historico_texto}
    
    Faça uma análise rápida e incisiva (máximo 3 frases curtas). 
    Destaque algo sobre o volume ou carga executada e sugira um pequeno ajuste para a próxima sessão.
    Seja direto e use o tom de um treinador rigoroso, mas encorajador.
    """

    try:
        model = genai.GenerativeModel("models/gemini-2.0-flash")
        response = model.generate_content(prompt)
        return {"feedback": response.text}
    except Exception as e:
        return {"feedback": f"Erro de comunicação com a base de IA: {str(e)}"}