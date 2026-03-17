// ══════════════════════════════════════════════════
//  Crescent English Quiz Pro — Service Worker
//  ⚠️  زد رقم CACHE_VERSION عند كل تحديث للكود
// ══════════════════════════════════════════════════

const CACHE_VERSION = 'crescent-quiz-v1.0.0';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Noto+Kufi+Arabic:wght@400;600;700&display=swap'
];

// ── Install: cache static assets ──
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Failed to cache some assets:', err);
      });
    })
  );
});

// ── Activate: clean old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_VERSION)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for app assets, network-first for JSON data ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Don't cache cross-origin requests (except Google Fonts)
  if (url.origin !== self.location.origin &&
      !url.hostname.includes('fonts.gstatic.com') &&
      !url.hostname.includes('fonts.googleapis.com')) {
    return;
  }

  // Network-first for navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
