/* NayomaTrade: service worker. Cambia el número de VERSION cada vez que subas una versión nueva. */
const VERSION = 'v1';
const CACHE = 'nayomatrade-' + VERSION;
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const CACHEABLE_HOSTS = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('nayomatrade-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Los datos de mercado nunca se guardan en caché.
  if (/binance\.(com|vision)$/.test(url.hostname)) return;
  if (url.origin !== location.origin && !CACHEABLE_HOSTS.includes(url.hostname)) return;
  // Responde con lo guardado y actualiza en segundo plano.
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
