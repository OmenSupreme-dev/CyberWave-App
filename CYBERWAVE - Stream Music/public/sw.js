const CACHE_NAME = 'cyberwave-v1';
const STATIC_CACHE = 'cyberwave-static-v1';
const DYNAMIC_CACHE = 'cyberwave-dynamic-v1';
const MEDIA_CACHE = 'cyberwave-media-v1';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE && key !== MEDIA_CACHE)
          .map((key) => {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // Handle media files (audio/video) - cache first for downloaded content
  if (request.destination === 'audio' || request.destination === 'video') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving media from cache:', url.pathname);
          return cachedResponse;
        }
        return fetch(request);
      })
    );
    return;
  }

  // Handle images - cache with network fallback
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          // Return placeholder for failed images
          return new Response('', { status: 404 });
        });
      })
    );
    return;
  }

  // Handle other requests - network first, cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && url.origin === self.location.origin) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
  if (event.data.type === 'DOWNLOAD_MEDIA') {
    const { url, id } = event.data;
    console.log('[SW] Downloading media:', url);
    
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return caches.open(MEDIA_CACHE).then((cache) => {
            cache.put(url, response.clone());
            // Notify the app that download is complete
            self.clients.matchAll().then((clients) => {
              clients.forEach((client) => {
                client.postMessage({
                  type: 'DOWNLOAD_COMPLETE',
                  id,
                  url,
                });
              });
            });
            return response;
          });
        }
        throw new Error('Download failed');
      })
      .catch((error) => {
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'DOWNLOAD_ERROR',
              id,
              error: error.message,
            });
          });
        });
      });
  }

  if (event.data.type === 'DELETE_MEDIA') {
    const { url } = event.data;
    caches.open(MEDIA_CACHE).then((cache) => {
      cache.delete(url);
    });
  }

  if (event.data.type === 'GET_CACHED_MEDIA') {
    caches.open(MEDIA_CACHE).then((cache) => {
      cache.keys().then((keys) => {
        const urls = keys.map((key) => key.url);
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'CACHED_MEDIA_LIST',
              urls,
            });
          });
        });
      });
    });
  }
});
