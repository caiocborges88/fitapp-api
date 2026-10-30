const CACHE = 'fitapp-8025f00c044b5983';
const ASSETS = ["/","/index.html","/manifest.json","/icon-192.png","/icon-512.png","/icon.svg","/illustrations/celebration.svg","/illustrations/movement.svg","/illustrations/preparation.svg","/css/design.css","/css/energy.css","/css/mobile-flow.css","/css/style.css","/fonts/Manrope.ttf","/js/ai-features.js","/js/ai-policy.js","/js/ai.js","/js/api.js","/js/app.js","/js/appearance.js","/js/audio.js","/js/biset-requirements.js","/js/campaign-store.js","/js/combat.js","/js/coverage-view.js","/js/cycle-review.js","/js/dados.js","/js/data-controls.js","/js/domain.js","/js/draft-domain.js","/js/drafts.js","/js/editor-domain.js","/js/editor.js","/js/environment-controls.js","/js/environment-proposal-controls.js","/js/environment-proposal.js","/js/environment.js","/js/equipment-settings.js","/js/experience.js","/js/forge.js","/js/gamification.js","/js/icons.js","/js/mobile-flow.js","/js/model-controls.js","/js/model-coverage-view.js","/js/model-coverage.js","/js/model-settings.js","/js/movement-requirements.js","/js/routine-coverage.js","/js/routine-review.js","/js/state.js","/js/storage.js","/js/sync-domain.js","/js/sync.js","/js/training-tracking-view.js","/js/training-tracking.js","/js/ui.js","/js/utils.js","/js/workout-methods.js","/js/workout-models.js","/vendor/chart.js","/vendor/firebase-app.js","/vendor/firebase-auth.js","/vendor/firebase-firestore.js","/vendor/html2canvas.js"];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(url => new Request(url, {cache:'reload'}))))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('fitapp-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/') || url.pathname.includes('admin')) return;
  if (!ASSETS.includes(url.pathname) && event.request.mode !== 'navigate') return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(event.request, {ignoreSearch:true});
    if (cached) return cached;
    try { return await fetch(event.request); }
    catch (error) { if(event.request.mode==='navigate') return cache.match('/index.html'); throw error; }
  }));
});
