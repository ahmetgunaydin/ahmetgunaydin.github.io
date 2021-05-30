importScripts("precache-manifest.db5d5e48f64940d7078c1221ab25fa2c.js", "workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.

self.addEventListener("message", (e) => {
  
  if (!e.data) {
    return;
  }

  switch (e.data) {
    case "skipWaiting":
      self.skipWaiting();
      console.log("skipWaiting");
      break;
    default:
      // NOOP
      break;
  }
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
         
          console.log(cacheName, "siliniyor sw...")
          return true;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4, else
// workbox.clientsClaim(); // Vue CLI 3 and Workbox v3.

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings(); // Only used with Vue CLI 3 and Workbox v3.
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

