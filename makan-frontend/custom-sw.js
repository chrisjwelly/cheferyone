// Reference: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker

// cache all network responses
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.open("dynamic").then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return (
          response ||
          fetch(event.request).then(function (response) {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      });
    })
  );
});

// serve response from network falling back on cache
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    })
  );
});
