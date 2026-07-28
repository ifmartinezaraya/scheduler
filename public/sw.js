// Service worker de AURA (PWA). Estrategia: network-first con respaldo en caché.
const CACHE = "aura-cache-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Limpia cachés antiguas de versiones anteriores.
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Guarda una copia en caché para uso sin conexión.
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
        return response;
      })
      .catch(async () => {
        // Si no hay red, sirve desde caché.
        const cached = await caches.match(request);
        if (cached) return cached;
        // Respaldo para navegación: la página de inicio.
        if (request.mode === "navigate") {
          const home = await caches.match("/");
          if (home) return home;
        }
        return new Response("Sin conexión", { status: 503, statusText: "Offline" });
      })
  );
});
