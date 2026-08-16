const CACHE_NAME = 'fitapp-cache-v6'; // Atualizamos a versão para forçar a limpeza
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
  // Ignora chamadas para APIs e pro Firebase
  if (event.request.url.includes('/api/') || event.request.url.includes('firestore.googleapis.com')) {
      return; 
  }
  
  // NOVO: Ignora explicitamente as páginas da Torre de Controle (Admin)
  if (event.request.url.includes('admin.html') || event.request.url.includes('/js/admin.js')) {
      return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});