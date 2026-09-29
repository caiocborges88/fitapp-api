import { state } from './state.js';


export async function fetchAIFeedback() {
        document.getElementById('aiLoader').style.display = 'block';
        document.getElementById('aiResponse').style.display = 'none';
        document.getElementById('btnAnalyzeAI').disabled = true;

        try {
            const data = await FitAPI.getCoachFeedback();
            
            document.getElementById('aiResponse').innerHTML = `<strong>Feedback do Coach:</strong><br>${data.feedback}`;
            document.getElementById('aiResponse').style.display = 'block';
            if(state.audioEnabled) window.FitApp.speak("Análise concluída.");
        } catch (error) { window.FitApp.showToast("Erro ao contatar o servidor."); } 
        finally { document.getElementById('aiLoader').style.display = 'none'; document.getElementById('btnAnalyzeAI').disabled = false; }
    }

export function openImportAiModal() {
        document.getElementById('importAiModal').style.display = 'flex';
        const nameInput = document.getElementById('aiWorkoutName');
        const textInput = document.getElementById('aiWorkoutText');
        if (nameInput) nameInput.value = '';
        if (textInput) textInput.value = '';
        
        // Sempre abre na aba de Criação por padrão
        if(switchAiTab) switchAiTab('criar');
    }

export function switchAiTab(tab) {
        const btnCriar = document.getElementById('btnTabAiCriar');
        const btnImportar = document.getElementById('btnTabAiImportar');
        const routeCriar = document.getElementById('aiRouteCriar');
        const routeImportar = document.getElementById('aiRouteImportar');
        const textInput = document.getElementById('aiWorkoutText');

        // ESCUDO TÁTICO: Se o cache estiver usando o HTML antigo, aborta sem travar o aplicativo
        if (!btnCriar || !btnImportar || !routeCriar || !routeImportar) {
            console.warn("Aviso: HTML desatualizado detectado. Limpe o cache do navegador.");
            return;
        }

        if (tab === 'criar') {
            btnCriar.style.background = '#00ff88'; btnCriar.style.color = '#000';
            btnImportar.style.background = 'transparent'; btnImportar.style.color = '#888';
            routeCriar.style.display = 'block';
            routeImportar.style.display = 'none';
            if(textInput) textInput.value = ''; // Limpa o texto para garantir a rota de criação
        } else {
            btnImportar.style.background = '#00ff88'; btnImportar.style.color = '#000';
            btnCriar.style.background = 'transparent'; btnCriar.style.color = '#888';
            routeImportar.style.display = 'block';
            routeCriar.style.display = 'none';
        }
    }

export async function processWorkoutWithAI() {
        const methodSelect = document.getElementById('aiMethod');
        const aiMethod = methodSelect ? methodSelect.value : 'abc';
        const methodName = methodSelect ? methodSelect.options[methodSelect.selectedIndex].text : 'IA';
        
        const env = document.getElementById('aiEnv').value;
        const workoutName = document.getElementById('aiWorkoutName').value || `Rotina - ${methodName}`;
        const pastedText = document.getElementById('aiWorkoutText').value.trim();
        
        const loader = document.getElementById('aiImportLoader');
        const btn = document.getElementById('btnProcessAi');
        
        loader.style.display = 'block';
        btn.disabled = true;
        
        let megaPrompt = "";

        if (pastedText !== "") {
            megaPrompt = `
            O usuário quer importar este treino:
            "${pastedText}"
            
            Se for apenas um dia de treino, chame-o de "${workoutName}".
            Retorne APENAS um JSON válido.
            `;
        } else {
            let instruction = "";
            switch(aiMethod) {
                case 'abc':
                    instruction = "Crie uma periodização de 3 dias (ABC). Dia 1: Push (Peito, Ombro, Tríceps). Dia 2: Pull (Costas, Trapézio, Bíceps). Dia 3: Legs (Quadríceps, Isquiotibiais, Panturrilhas, Core). Para cada dia, escolha de 5 a 6 exercícios clássicos.";
                    break;
                case 'abcd':
                    instruction = "Crie uma periodização de 4 dias (ABCD). Dia 1: Peito e Tríceps. Dia 2: Foco Anterior (Quadríceps e Panturrilha). Dia 3: Costas e Bíceps. Dia 4: Foco Posterior (Isquiotibiais, Glúteos e Ombros). Para cada dia, escolha 5 a 6 exercícios.";
                    break;
                case 'biset_agonista':
                    instruction = "Crie uma periodização de 3 dias (Push/Pull/Legs). OBRIGATÓRIO: Agrupe os movimentos em 'Bi-sets Agonistas' (2 exercícios seguidos para o MESMO músculo, ex: Supino reto + Crucifixo). Escolha 6 exercícios por dia formando 3 blocos de bi-sets.";
                    break;
                case 'biset_antagonista':
                    instruction = "Crie uma periodização de 3 dias. OBRIGATÓRIO: Agrupe os movimentos em 'Bi-sets Antagônicos/Mistos' (2 exercícios seguidos para músculos OPOSTOS, ex: Peito + Costas, ou Quadríceps + Posterior). Escolha 6 exercícios por dia formando 3 blocos de bi-sets.";
                    break;
                case 'biset_sinergista':
                    instruction = "Crie uma periodização de 3 dias. OBRIGATÓRIO: Agrupe os movimentos em 'Bi-sets Sinergistas' (ex: Peito + Tríceps, Costas + Bíceps, Pernas + Ombros). Escolha 6 exercícios por dia formando 3 blocos de bi-sets.";
                    break;
                case 'circuito':
                    instruction = "Crie 1 único treino no formato Circuito Metabólico FullBody. Escolha de 6 a 8 exercícios trabalhando o corpo todo de forma dinâmica. O objetivo é alto gasto calórico com mínimo descanso.";
                    break;
            }

            const allowedExercises = window.dictionaryData.filter(d => {
                if (env === 'academia') return d.equip !== 'peso_corporal' && d.equip !== 'calistenia'; 
                if (env === 'calistenia') return d.equip === 'peso_corporal' || d.equip === 'calistenia';
                return d.equip === 'peso_corporal';
            }).map(d => d.name).join(", ");
            
            megaPrompt = `
            ${instruction}
            
            REGRA ABSOLUTA: Você SÓ PODE usar os exercícios exatos desta lista abaixo. Não invente nenhum outro nome.
            LISTA PERMITIDA: [${allowedExercises}].
            
            Defina séries lógicas (ex: 3 ou 4) e repetições adequadas (ex: 8-12, ou 15-20 para circuito).
            Retorne APENAS o JSON válido.
            `;
        }

        try {
            const data = await FitAPI.importarTreinoIA(megaPrompt);
            
            if (data.resultado && data.resultado !== "[]") {
                let cleanData = data.resultado;
                
                // 🛡️ ESCUDO ANTI-ALUCINAÇÃO: Extrai apenas o JSON puro (Arrays ou Objetos) ignorando texto extra do LLM
                const jsonMatch = cleanData.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
                if (jsonMatch) {
                    cleanData = jsonMatch[0];
                }
                
                const parsed = JSON.parse(cleanData);
                state.currentWorkoutType = 'custom_ia';
                
                // ESCUDO DE DADOS: Força a extração da Lista (Array), ignorando objetos externos
                let workoutArray = [];
                if (Array.isArray(parsed)) {
                    workoutArray = parsed;
                } else {
                    // Se a IA embrulhou num Objeto, procura a primeira Lista dentro dele
                    workoutArray = Object.values(parsed).find(val => Array.isArray(val)) || [];
                }

                if (workoutArray.length === 0) {
                    throw new Error("Formato de JSON inválido. A IA não devolveu uma lista.");
                }
                
                // 1. Converte o pacote inteiro da IA para o padrão do aplicativo
                const todosOsTreinos = workoutArray.map((dia, index) => {
                    const idLetra = String.fromCharCode(65 + index);
                    const nomeTreino = dia.nome_treino || dia.nome || `Dia ${index + 1}`;
                    const exercicios = dia.exercicios || dia.exercises || [];

                    return {
                        nome_treino: pastedText === "" && workoutArray.length > 1 ? `Treino ${idLetra} - ${nomeTreino}` : nomeTreino,
                        exercicios: exercicios.map(ex => ({ 
                            nome: ex.nome || ex.name || "Exercício Não Mapeado", 
                            series: parseInt(ex.series || ex.sets) || 4, 
                            repeticoes: ex.repeticoes || ex.reps || "10-12 rep" 
                        }))
                    };
                });

                // 2. Extrai o Dia 1 para a tela atual
                const treinoDia1 = todosOsTreinos.shift(); 
                state.currentRoutine = [{
                    title: treinoDia1.nome_treino,
                    exercises: treinoDia1.exercicios.map(ex => ({ name: ex.nome, sets: ex.series, target: ex.repeticoes }))
                }];

                // 3. Joga o resto na Fila e salva na Memória Persistente
                state.filaDeTreinosIA = todosOsTreinos;
                window.FitApp.safeSet('fitapp_fila_ia', JSON.stringify(state.filaDeTreinosIA));
                
                document.getElementById('importAiModal').style.display = 'none';
                
                const customControls = document.getElementById('customWorkoutControls');
                const nameContainer = document.getElementById('customWorkoutNameContainer');
                const nameInput = document.getElementById('customWorkoutName');
                
                if(customControls) customControls.style.display = 'flex';
                if(nameContainer) nameContainer.style.display = 'block';
                if(nameInput) nameInput.value = workoutName;
                
                document.getElementById('previewTitle').textContent = pastedText ? `🤖 Treino Importado` : `🤖 Periodização Criada`;
                document.getElementById('previewDesc').textContent = `Revise os movimentos. Clique em 'Salvar Template' para guardá-lo permanentemente na sua estante.`;
                
                const workoutCards = document.getElementById('workoutCards');
                if (workoutCards) workoutCards.style.display = 'none';
                
                const dashHeader = document.querySelector('.dashboard-header');
                if (dashHeader) dashHeader.style.display = 'none';
                
                const workoutPreview = document.getElementById('workoutPreview');
                if (workoutPreview) workoutPreview.style.display = 'block';

                window.FitApp.renderPreviewList();
                window.FitApp.showToast("A inteligência artificial processou os dados com sucesso!");
                
                document.getElementById('aiWorkoutText').value = "";
                document.getElementById('aiWorkoutName').value = "";
            } else {
                window.FitApp.showToast("Falha na geração do treino. Tente novamente.");
            }
        } catch (error) {
            console.error(error);
            window.FitApp.showToast("Erro de conexão com o servidor de IA.");
        } finally {
            loader.style.display = 'none';
            btn.disabled = false;
        }
    }

export function carregarProximoTreinoIA() {
        if (state.filaDeTreinosIA.length === 0) {
            window.FitApp.safeSet('fitapp_fila_ia', '[]'); // Limpa a memória
            window.FitApp.showToast("Periodização importada e salva com sucesso!");
            window.FitApp.cancelWorkoutPreview(); 
            window.FitApp.renderCustomWorkouts();
            return;
        }

        const treinoAtual = state.filaDeTreinosIA.shift(); 
        window.FitApp.safeSet('fitapp_fila_ia', JSON.stringify(state.filaDeTreinosIA)); // Atualiza a memória física

        document.getElementById('workoutCards').style.display = 'none';
        const header = document.querySelector('.dashboard-header');
        if (header) header.style.display = 'none';
        
        const preview = document.getElementById('workoutPreview');
        const customControls = document.getElementById('customWorkoutControls');
        const nameContainer = document.getElementById('customWorkoutNameContainer');
        const nameInput = document.getElementById('customWorkoutName');

        if(customControls) customControls.style.display = 'flex';
        if(nameContainer) nameContainer.style.display = 'block';

        if (nameInput) nameInput.value = treinoAtual.nome_treino;
        document.getElementById('previewTitle').textContent = `Revisando IA`;
        document.getElementById('previewDesc').textContent = `Ajuste os exercícios e salve para puxar o próximo dia.`;

        state.currentWorkoutType = 'novo_customizado';

        state.currentRoutine = [{
            title: "Treino Importado",
            exercises: treinoAtual.exercicios.map(ex => ({
                name: ex.nome,
                sets: parseInt(ex.series) || 4,
                target: ex.repeticoes || "10"
            }))
        }];

        window.FitApp.renderPreviewList(); 
        
        const botoes = document.querySelectorAll('button');
        botoes.forEach(btn => {
            if (btn.innerText.includes('Salvar Template') || btn.innerText.includes('Salvar e Revisar')) {
                if (state.filaDeTreinosIA.length > 0) {
                    btn.innerText = `Salvar e Revisar Próximo (${state.filaDeTreinosIA.length} restantes)`;
                } else {
                    btn.innerText = "Salvar Template Final";
                }
            }
        });

        if (preview) preview.style.display = 'block';
    }

