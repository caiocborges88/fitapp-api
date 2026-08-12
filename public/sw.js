const CACHE_NAME = 'fitapp-cache-v3'; // Atualizado para v3 para purgar o cache do servidor antigo
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

// Estágio de Instalação: Guarda os arquivos base na memória do celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Estágio de Interceptação: Cache-First (com Network Fallback)
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