const CACHE = "firepumps-v1";

const ASSETS = [
  "/Firepumpsmonitoring/dashboard.html",
  "/Firepumpsmonitoring/manifest.json",
  "/Firepumpsmonitoring/sw.js",
  "/Firepumpsmonitoring/assets/alarm.wav",
  "/Firepumpsmonitoring/assets/icon-192.png",
  "/Firepumpsmonitoring/assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : null)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
