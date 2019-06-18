const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
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
});

// fetch event (required for install banner)
self.addEventListener("fetch", evt => {
  //console.log("Fetch event.", evt);
});
