const appVersion = 'v-1.2';
const static = 'static-' + appVersion;
const dynamic = 'dynamic';

const offline = [
  './main.js',
  './index.html',
]

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    // 缓存应用离线时需要的文件
    const cache = await caches.open(static);
    cache.addAll(offline);
  })())

  skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    (await caches.keys()).map(cacheName => {
      if (![static, dynamic].includes(cacheName)) {
        caches.delete(cacheName);
      }
    })
  })());
})

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  event.respondWith((async () => {
    const cache = await caches.open(static);
    const result = await cache.match(url);
    if (result) {
      return result;
    }
    const response = await fetch(url);
    cache.put(url, response.clone());
  })());
});

self.addEventListener('backgroundfetchsuccess', (event) => {
  console.log('backgroud fetch success!');
  const bgFetch = event.registration;

  event.waitUntil((async () => {
    event.updateUI({title: 'download success!'})
  })());
})