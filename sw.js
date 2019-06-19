const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/pages/fallback.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

// install service worker
self.addEventListener("install", evt => {
  //console.log("Service Worker has been installed!");
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log("Caching shell assets.");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", evt => {
  //console.log("Service Worker has been activated!");
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key)));
    })
  );
});

// fetch event (required for install banner)
self.addEventListener("fetch", evt => {
  //console.log("Fetch event.", evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    }).catch(() => {
      if(evt.request.url.indexOf(".html") > -1){
        return caches.match("/pages/fallback.html");
      }
    })
  );
});
