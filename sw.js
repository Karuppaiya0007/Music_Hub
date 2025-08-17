self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('lofi-cache').then(cache => cache.addAll([
      '/', '/index.html', '/app.js', '/manifest.webmanifest',
      '/assets/icons/icon-192.png', '/assets/icons/icon-512.png'
    ]))
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
