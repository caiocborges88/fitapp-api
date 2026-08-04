import os
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega a sua chave secreta
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("🔍 Buscando modelos liberados para a sua chave...")
print("-" * 50)

# Vasculha e imprime apenas os modelos que conseguem gerar texto
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
    print("-" * 50)
    print("✅ Concluído! Copie um dos nomes acima.")
except Exception as e:
    print(f"Erro ao buscar modelos: {e}")