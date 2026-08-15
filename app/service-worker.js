/* ══════════════════════════════════════════════════════════
   RxLoop — service worker
   Precaches the shell so the app opens with no network.
   Strategy:
     · app shell + data  → cache-first (must work at zero bars)
     · fonts / CDN       → stale-while-revalidate
     · everything else   → network, falling back to cache
   Bump CACHE when any precached file changes.
   ══════════════════════════════════════════════════════════ */
const CACHE = 'rxloop-v3';

const SHELL = [
  '/app/',
  '/app/index.html',
  '/app/app.js',
  '/app/data.js',
  '/app/manifest.json',
  '/app/icons/icon-192.png',
  '/app/icons/icon-512.png',
  '/styles.css',
  '/assets/logo.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      // addAll rejects wholesale if one entry 404s, so add individually
      .then(cache => Promise.all(SHELL.map(url => cache.add(url).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isShell = url.origin === location.origin && SHELL.some(p => url.pathname === p);
  const isFont  = /fonts\.(googleapis|gstatic)\.com/.test(url.hostname);

  if (isShell) {
    event.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }))
    );
    return;
  }

  if (isFont) {
    event.respondWith(
      caches.match(req).then(hit => {
        const net = fetch(req).then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then(res => {
        if (url.origin === location.origin && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match('/app/index.html')))
  );
});
