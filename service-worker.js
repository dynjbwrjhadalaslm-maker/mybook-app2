const CACHE_NAME = 'mybook-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// অ্যাপ ইনস্টলের সময় ফাইলগুলো ক্যাশে সেভ করা হয় (অফলাইন সাপোর্টের জন্য)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// পুরনো ক্যাশ পরিষ্কার করা
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// নেটওয়ার্ক না থাকলে ক্যাশ থেকে ফাইল দেখানো
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
