// Reference: https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker

// cache all GET
self.addEventListener("fetch", function (event) {
  if (event.request.method === "GET") {
    console.log(event);
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
  }
});

// serve response from network falling back on cache
self.addEventListener("fetch", function (event) {
  if (event.request.method === "GET") {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(event.request);
      })
    );
  }
});

// remove unused cache
// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });
