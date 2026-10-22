const {FieldValue}=require('firebase-admin/firestore');
const httpError=(status,message)=>Object.assign(new Error(message),{status});
function createRewardService(db,catalogue){
async function reward(user,sessionId,action){
    const playerRef=db.collection('jogadores').doc(user.uid);
    const claimRef=db.collection('recompensas').doc(`${user.uid}_${action==='craft'?'craft_':''}${sessionId}`);
    return db.runTransaction(async tx=>{
        const playerDoc=await tx.get(playerRef);
        const profile=playerDoc.exists?playerDoc.data():{album:[],repetidas:0};
        const album=Array.isArray(profile.album)?[...new Set(profile.album)]:[];
        let repetidas=Math.max(0,Number(profile.repetidas)||0);let drawn,isRepeated=false;
        const previous=await tx.get(claimRef);
        if(previous.exists)return {...previous.data(),profile:{album,repetidas}};
        if(action==='claim'){
            const session=await tx.get(db.collection('treinos_concluidos').doc(sessionId));
            if(!session.exists||session.data().userId!==user.uid||!session.data().complete||session.data().duration_secs<120)throw httpError(409,'Aguarde a sincronização de um treino completo antes de abrir a recompensa.');
            const roll=Math.random();const rarity=roll>.95?'holografico':roll>.85?'ouro':roll>.60?'prata':'comum';
            const pool=catalogue.stickers.filter(s=>s.rarity===rarity);drawn=pool[Math.floor(Math.random()*pool.length)];
            isRepeated=album.includes(drawn.id);if(isRepeated)repetidas++;else album.push(drawn.id);
        }else{
            const pool=catalogue.stickers.filter(s=>!album.includes(s.id)&&['comum','prata'].includes(s.rarity));
            if(repetidas<3||!pool.length)throw httpError(409,'Você precisa de 3 pontos e uma peça disponível para fabricar.');
            drawn=pool[Math.floor(Math.random()*pool.length)];album.push(drawn.id);repetidas-=3;
        }
        const result={drawn,isRepeated,profile:{album,repetidas}};
        tx.set(playerRef,{album,repetidas,poder_combate:album.length*10+repetidas,nome:String(user.name||'Atleta').slice(0,80),ultimoAcesso:FieldValue.serverTimestamp()},{merge:true});
        tx.set(db.collection('rankings').doc(user.uid),{nome:String(user.name||'Atleta').slice(0,80),poder_combate:album.length*10+repetidas,cartas:album.length,repetidas});
        tx.set(claimRef,result);
        return result;
    });
}
return reward;
}
module.exports={createRewardService};
