// Flash Network service-worker
const CACHE = 'flash-network-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        './',               // root
        './index.html',     // main page
        './manifest.json'   // PWA manifest
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedRes => {
      // return cached version first, fall back to network
      return cachedRes || fetch(e.request);
    })
  );
});

