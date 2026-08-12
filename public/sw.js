const CACHE_NAME = 'fitapp-cache-v4'; // Atualizado para v4 para aplicar o novo layout e JS
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
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Estágio 2: Interceptação (Cache-First com Network Fallback)
self.addEventListener('fetch', event => {
  // Ignora requisições de API (Não queremos "cachear" as respostas do banco de dados ou da IA)
  if (event.request.url.includes('/api/')) {
      return; 
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache se existir
        }
        return fetch(event.request); // Se não, busca da internet
      })
  );
});

// Estágio 3: Ativação / Lixeiro (Apaga os caches fantasmas e versões antigas)
self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Destrói a memória antiga
          }
        })
      );
    })
  );
});