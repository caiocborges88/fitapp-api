const CACHE_NAME = 'fitapp-cache-v5'; // Versão atualizada para quebrar o cache antigo
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

// Estágio 1: Instalação (Guarda os arquivos base na memória do celular)
self.addEventListener('install', event => {
  // NOVO: Força o novo Service Worker a expulsar o antigo imediatamente
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Estágio 2: Interceptação (Network-First com Cache Fallback)
// Agora o app sempre tenta pegar a versão mais nova do servidor. Se estiver sem internet, usa o cache.
self.addEventListener('fetch', event => {
  // Ignora requisições de API e Firebase (Não "cacheia" banco de dados)
  if (event.request.url.includes('/api/') || event.request.url.includes('firestore.googleapis.com')) {
      return; 
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Se a internet funcionou, entrega o arquivo fresquinho do servidor
        return response;
      })
      .catch(() => {
        // Se a internet caiu ou falhou (Modo Offline da Skyfit), busca no cofre do cache
        return caches.match(event.request);
      })
  );
});

// Estágio 3: Ativação / Lixeiro (Apaga os caches fantasmas e assume a tela)
self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Destrói a memória da versão antiga
          }
        })
      );
    }).then(() => {
      // NOVO: Faz o app novo assumir o controle da aba sem precisar do F5 forçado
      return self.clients.claim();
    })
  );
});