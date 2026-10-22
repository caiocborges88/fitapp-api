const {onRequest}=require('firebase-functions/v2/https');
const {initializeApp}=require('firebase-admin/app');
const {getAuth}=require('firebase-admin/auth');
const {getFirestore}=require('firebase-admin/firestore');
const {createApp}=require('./app');
const catalogue=require('./catalogue.json');
initializeApp();
const db=getFirestore();
const httpError=(status,message)=>Object.assign(new Error(message),{status});
async function useQuota(uid,kind,max){
    const day=new Date().toISOString().slice(0,10);
    const ref=db.collection('api_usage').doc(`${uid}_${day}`);
    await db.runTransaction(async tx=>{
        const doc=await tx.get(ref);const count=doc.data()?.[kind]||0;
        const globalRef=db.collection('api_usage').doc(`global_${day}`);
        const globalDoc=kind==='workout'?await tx.get(globalRef):null;
        const globalCount=globalDoc?.data()?.workout||0;
        if(kind==='workout'&&globalCount>=2000)throw httpError(429,'Global quota exceeded');
        if(count>=max)throw httpError(429,'Quota exceeded');
        tx.set(ref,{[kind]:count+1,expiresAt:new Date(Date.now()+3*86400000)},{merge:true});
        if(kind==='workout')tx.set(globalRef,{workout:globalCount+1,expiresAt:new Date(Date.now()+3*86400000)},{merge:true});
    });
}
// Kept for a future validated import flow; the current API policy rejects AI requests before this callback.
const generateWorkout=(text,options)=>require('./ai').createWorkoutGenerator(catalogue)(text,options);
const {createRewardService}=require('./rewards');
const reward=createRewardService(db,catalogue);
const app=createApp({verifyToken:token=>getAuth().verifyIdToken(token),useQuota,generateWorkout,reward,
    coach:async()=>'Respeite seus limites, registre o que realizou e mantenha a consistência. Recuperar também faz parte do plano.'});
exports.api=onRequest({timeoutSeconds:60,maxInstances:3,concurrency:20},app);
