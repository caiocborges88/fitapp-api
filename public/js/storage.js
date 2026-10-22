/* Conta e persistência local. Falha de armazenamento nunca equivale a sucesso. */
(() => {
    let uid = null;
    const prefix = () => `fitapp:user:${uid || 'signed-out'}:`;
    const storageKey = key => prefix() + key;
    const get = key => localStorage.getItem(storageKey(key));
    const set = (key, value) => {
        localStorage.setItem(storageKey(key), String(value));
        if (typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') window.dispatchEvent(new CustomEvent('fitapp:datachange', {detail:{key}}));
        return true;
    };
    const remove = key => {
        localStorage.removeItem(storageKey(key));
        if (typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') window.dispatchEvent(new CustomEvent('fitapp:datachange', {detail:{key}}));
    };
    // Batch notifications happen only after every write succeeds. Callers write
    // the plan last, so failure cannot replace it with incomplete preferences.
    const setMany = values => {
        const entries=Object.entries(values),before=new Map(entries.map(([key])=>[key,get(key)])),written=[];
        try{
            for(const [key,value]of entries){localStorage.setItem(storageKey(key),String(value));written.push(key);}
        }catch(error){
            for(const key of written.reverse()){
                const previous=before.get(key);
                if(previous===null)localStorage.removeItem(storageKey(key));else localStorage.setItem(storageKey(key),previous);
            }
            throw error;
        }
        if(typeof window.dispatchEvent==='function'&&typeof CustomEvent==='function')window.dispatchEvent(new CustomEvent('fitapp:datachange',{detail:{keys:entries.map(([key])=>key)}}));
        return true;
    };
    const readJSON = (key, fallback) => {
        try { return JSON.parse(get(key) || 'null') ?? fallback; }
        catch { return fallback; }
    };
    function bindUser(userId) {
        uid = userId || null;
        if (!uid) return;
        // Migração não destrutiva: guarda os originais e atribui dados legados
        // sem proprietário somente à primeira conta que efetua a atualização.
        const owner = localStorage.getItem('fitapp_legacy_owner');
        if (!owner) localStorage.setItem('fitapp_legacy_owner', uid);
        const keys = Object.keys(localStorage).filter(k => k.startsWith('fitapp_') && k !== 'fitapp_legacy_owner');
        for (const key of keys) {
            if (get(key) !== null) continue;
            let value = localStorage.getItem(key);
            if (key === 'fitapp_week_log' || key === 'fitapp_sync_queue') {
                try {
                    const entries = JSON.parse(value);
                    value = JSON.stringify(entries.filter(e => e.userId === uid || (!e.userId && (!owner || owner === uid))).map(e => ({ ...e, userId: uid, _id: e._id || crypto.randomUUID() })));
                } catch { continue; }
            } else if (owner && owner !== uid) continue;
            set(key, value);
        }
    }
    async function updateQueue(update) {
        const account = uid;
        const run = () => {
            if (!account || uid !== account) throw new Error('A conta da sessão mudou.');
            const updated = update(readJSON('fitapp_sync_queue', []));
            set('fitapp_sync_queue', JSON.stringify(updated));
            return updated;
        };
        return navigator.locks ? navigator.locks.request(`fitapp-store:${account}`, run) : run();
    }
    window.FitStore = { get, set, setMany, remove, readJSON, bindUser, updateQueue, get uid() { return uid; } };
})();
