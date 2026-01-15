const CACHE_NAME = "geoPT-shell-v1";

const APP_SHELL = [
  "/geografia-portugal/",
  "/geografia-portugal/index.html",
  "/geografia-portugal/manifest.webmanifest",
  "/geografia-portugal/icons/icon-192.png",
  "/geografia-portugal/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Navegação (abrir a app)
  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("/geografia-portugal/index.html").then(
        (cached) => cached || fetch(req)
      )
    );
    return;
  }

  // Assets normais
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
