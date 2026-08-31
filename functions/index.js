const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const cors = require("cors");

const app = express();

// 1. ANULA O BLOQUEIO DE FRONTEIRA (CORS)
app.use(cors({ origin: true }));
app.use(express.json());

// 2. ROTEADOR DUPLO (Ignora o Roteamento Fantasma)
const router = express.Router();

router.post("/importar-treino-ia", async (req, res) => {
    try {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) throw new Error("Chave de API não localizada no cofre.");
        
        const prompt = req.body.texto;
        if (!prompt) throw new Error("O texto do prompt não chegou no servidor.");
        
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        
        // 1. MATRIZ DE ESTRUTURA (O Molde de Gesso)
        const workoutSchema = {
            type: SchemaType.ARRAY,
            description: "Lista de dias de treino",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    nome_treino: { type: SchemaType.STRING, description: "Nome do dia, ex: Treino A" },
                    exercicios: {
                        type: SchemaType.ARRAY,
                        items: {
                            type: SchemaType.OBJECT,
                            properties: {
                                nome: { type: SchemaType.STRING, description: "Nome exato do exercício" },
                                series: { type: SchemaType.INTEGER, description: "Número de séries" },
                                repeticoes: { type: SchemaType.STRING, description: "Faixa de repetições" }
                            },
                            required: ["nome", "series", "repeticoes"]
                        }
                    }
                },
                required: ["nome_treino", "exercicios"]
            }
        };

        // 2. MOTOR BLINDADO
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3.6-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: workoutSchema,
            }
        });
        
        const result = await model.generateContent(prompt);
        // O Filtro Tático de regex não é mais necessário. A API devolve um JSON puro.
        const text = result.response.text();
        
        res.json({ resultado: text });
    } catch (error) {
        console.error("Erro Tático IA:", error);
        // Agora o erro real desce para a tela do seu app
        res.status(500).json({ error: error.message });
    }
});

router.get("/coach", async (req, res) => {
    try {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) throw new Error("Chave de API não localizada no cofre.");
        
        const prompt = "Você é um sargento durão e motivador de academia. Dê uma bronca encorajadora de 2 linhas para o atleta manter o foco no treino de hoje.";
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        
        // ATUALIZAÇÃO: Motor do Coach também foi atualizado para a versão 3.6
        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
        
        const result = await model.generateContent(prompt);
        res.json({ feedback: result.response.text() });
    } catch (error) {
        console.error("Erro no Coach:", error);
        res.status(500).json({ error: error.message });
    }
});

// Ensina o servidor a responder tanto a "/coach" quanto a "/api/coach"
app.use("/", router);
app.use("/api", router);

// Expõe a API permitindo até 60 segundos de processamento para treinos gigantes
exports.api = onRequest({ secrets: ["GEMINI_API_KEY"], timeoutSeconds: 60 }, app);