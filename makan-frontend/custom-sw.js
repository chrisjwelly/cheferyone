// Get form network, if fail get from cache, else respond and save to cache
self.addEventListener("fetch", (event) => {
  if (
    event.request.method === "GET" &&
    !event.request.url.includes("https://www.google-analytics.com") &&
    !event.request.url.includes("https://maps.googleapis.com")
  ) {
    event.respondWith(
      (async function () {
        try {
          const res = await fetch(event.request);
          const cache = await caches.open("dynamic");
          event.waitUntil(cache.put(event.request, res.clone()));
          return res;
        } catch (err) {
          return caches.match(event.request) || err;
        }
      })()
    );
  }
});
