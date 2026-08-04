import sqlite3
from datetime import datetime

# Nome do arquivo que guardará todos os seus dados
DB_NAME = "fitapp.db"

def criar_tabelas():
    # Conecta ao banco (se o arquivo não existir, o Python cria na hora)
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # 1. Tabela do Histórico de Treinos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS treinos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data_treino TEXT,
            treino_tipo TEXT,
            exercicio TEXT,
            serie INTEGER,
            peso REAL,
            reps INTEGER
        )
    ''')
    
    # 2. Tabela do Álbum de Figurinhas
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS album (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sticker_id INTEGER UNIQUE,
            data_desbloqueio TEXT
        )
    ''')
    
    # Salva as alterações e fecha a conexão
    conn.commit()
    conn.close()
    print("✅ Banco de dados 'fitapp.db' e tabelas criados com sucesso!")

# Executa a função automaticamente quando rodarmos este arquivo
if __name__ == "__main__":
    criar_tabelas()