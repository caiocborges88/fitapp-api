const CACHE_NAME = 'fitapp-cache-v10'; // 🛡️ Versão 10: Blindagem Anti-Falhas e Nova Base de Dados
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/state.js',
  '/js/utils.js',
  '/js/audio.js',
  '/js/sync.js',
  '/js/forge.js',
  '/js/ai.js',
  '/js/combat.js',
  '/js/ui.js',
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
    caches.open(CACHE_NAME).then(cache => {
      // 🛡️ BLINDAGEM: Tenta guardar ficheiro a ficheiro. Se um falhar (ex: ai.js não existe), ele ignora o erro e salva os restantes.
      return Promise.all(
        urlsToCache.map(url => {
          return cache.add(url).catch(err => {
            console.warn(`[Spotter] Ficheiro não encontrado para cache, ignorando: ${url}`);
          });
        })
      );
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
      
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return networkResponse;
      }).catch(() => {
        console.log('[Spotter Digital] Operação Offline ativada.');
      });

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
            return caches.delete(cacheName); // Aniquila caches antigos
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});