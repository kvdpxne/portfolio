const CACHE_NAME = 'portfolio-v10';
const STATIC_ASSETS = [
  'index.html',
  'manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_ASSETS.map(url =>
          fetch(url, { cache: 'no-cache' })
            .then(response => {
              if (response.ok) return cache.put(url, response);
              console.warn('SW: pominięto (status ' + response.status + ')', url);
            })
            .catch(err => console.warn('SW: błąd pobierania', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, cloned));
          return response;
        })
        .catch(() => caches.match(request))
    );
  } else {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, cloned));
          return response;
        });
      })
    );
  }
});