// install service worker
self.addEventListener("install", evt => {
  console.log("Service Worker has been installed!");
});

// activate event
self.addEventListener("activate", evt => {
  console.log("Service Worker has been activated!");
});