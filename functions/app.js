'use strict';
const express = require('express');
const cors = require('cors');
const defaultAiPolicy=Object.freeze(require('./ai-policy.json'));
function createApp({ verifyToken, useQuota, generateWorkout, coach, reward, aiPolicy=defaultAiPolicy }) {
    const app = express();
    app.disable('x-powered-by');
    app.use(cors({ origin: ['https://fitapp-operacional.web.app','https://fitapp-operacional.firebaseapp.com',/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/] }));
    app.use(express.json({ limit: '32kb' }));
    const router = express.Router();
    router.use(async (req,res,next) => {
        const match = /^Bearer ([^\s]+)$/.exec(req.headers.authorization || '');
        if (!match) return res.status(401).json({error:'Entre na sua conta para continuar.'});
        try { req.user = await verifyToken(match[1]); next(); }
        catch { res.status(401).json({error:'Sua sessão expirou. Entre novamente.'}); }
    });
    router.post('/importar-treino-ia',async(req,res,next)=>{
        if(!aiPolicy.workouts)return res.status(409).json({code:'ai-deferred',error:'A criação e a importação por IA ficaram para a próxima fase. Use os modelos ou o cadastro manual.'});
        if(typeof req.body?.texto !== 'string' || !req.body.texto.trim() || req.body.texto.length > 16000) return res.status(400).json({error:'Envie um texto de treino com até 16.000 caracteres.'});
        if (req.body.env && !['academia','peso_corporal','calistenia'].includes(req.body.env)) return res.status(400).json({error:'Ambiente inválido.'});
        try { await useQuota(req.user.uid,'workout',20); res.json({resultado:JSON.stringify(await generateWorkout(req.body.texto, {env:req.body.env}))}); }
        catch(error){next(error);}
    });
    router.get('/coach',async(req,res,next)=>{
        if(!aiPolicy.coach)return res.status(409).json({code:'ai-deferred',error:'O assistente de IA ficou para a próxima fase.'});
        try { await useQuota(req.user.uid,'coach',30); res.json({feedback:await coach()}); } catch(error){next(error);}
    });
    router.post('/recompensas',async(req,res,next)=>{
        const {sessionId,action='claim'}=req.body||{};
        if(!['claim','craft'].includes(action)||typeof sessionId!=='string'||!/^[\w-]{1,128}$/.test(sessionId)) return res.status(400).json({error:'Sessão inválida.'});
        try { await useQuota(req.user.uid,'rewards',60); res.json(await reward(req.user,sessionId,action)); } catch(error){next(error);}
    });
    app.use('/api',router); app.use('/',router);
    app.use((error,req,res,next)=>{
        if(res.headersSent)return next(error);
        const status=error.type==='entity.too.large'?413:error instanceof SyntaxError?400:error.status||503;
        console.error('API request failed:',error.code||error.name);
        res.status(status).json({error:status===429?'Limite diário atingido. Tente novamente amanhã.':status===400||status===413?'Pedido inválido ou muito grande.':status===409?error.message:'Serviço temporariamente indisponível. Seus registros locais estão preservados.'});
    });
    return app;
}
module.exports={createApp};
