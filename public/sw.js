const CACHE_NAME = 'fitapp-cache-v8'; // 🛡️ Versão 8: Dispara a limpeza do cache antigo em todos os telemóveis
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/dados.js',
  '/js/api.js',            
  '/js/gamification.js',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Ignora chamadas dinâmicas (Firebase, Auth, Firestore e Torre de Controlo)
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('firestore.googleapis.com') ||
      event.request.url.includes('identitytoolkit') ||
      event.request.url.includes('admin.html') || 
      event.request.url.includes('/js/admin.js')) {
      return; 
  }

  // 🚀 ESTRATÉGIA STALE-WHILE-REVALIDATE (Imunidade ao "Lie-Fi" e Ecrãs Brancos)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      
      // 1. O motor vai buscar à rede em background (se houver internet)
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Se a resposta for válida, atualiza o cache silenciosamente para a próxima visita
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return networkResponse;
      }).catch(() => {
        // Se a rede falhar completamente (offline real ou Lie-Fi severo), ignora o erro. O cache garantirá o funcionamento.
        console.log('[Spotter Digital] Operação Offline ativada.');
      });

      // 2. A MÁGICA: Devolve a cache INSTANTANEAMENTE se existir. Se não existir (primeiro acesso da vida do utilizador), devolve a promessa da rede.
      return cachedResponse || fetchPromise;
    })
  );
});

self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Aniquila o v7 antigo
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});