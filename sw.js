// install service worker
self.addEventListener("install", evt => {
  console.log("Service Worker has been installed!");
});

// activate event
self.addEventListener("activate", evt => {
  console.log("Service Worker has been activated!");
});

// fetch event (required for install banner)
self.addEventListener("fetch", evt => {
  //console.log("Fetch event.", evt);
});