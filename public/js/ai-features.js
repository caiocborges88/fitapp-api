import './ai-policy.js';
export const aiWorkoutsEnabled=()=>globalThis.FitAIPolicy?.workouts===true;
export const aiCoachEnabled=()=>globalThis.FitAIPolicy?.coach===true;
export const AI_DEFERRED_MESSAGE='Os recursos de IA ficaram para a próxima fase. Use os modelos testados ou cadastre sua ficha manualmente.';
