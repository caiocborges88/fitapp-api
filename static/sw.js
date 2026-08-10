const CACHE_NAME = 'fitapp-cache-v2'; // Alterado para v2 para forçar a atualização do cache
const urlsToCache = [
  '/',
  '/static/css/style.css',
  '/static/js/app.js',
  '/static/js/dados.js',
  '/static/js/api.js',            // NOVO: Adicionado à matriz de sobrevivência
  '/static/js/gamification.js'    // NOVO: Adicionado à matriz de sobrevivência
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