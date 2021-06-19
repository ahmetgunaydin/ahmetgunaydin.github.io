importScripts("precache-manifest.afb3ae3a04a2c1466a663dcc94d6d4bc.js", "workbox-v4.3.1/workbox-sw.js");
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
     
      break;

    default:
      // NOOP
      break;
  }
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {

          console.log(cacheName, "siliniyor sw...")
          return true;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
 


});
self.addEventListener('notificationclick', event => {
  event.waitUntil(self.clients.openWindow('/'));
});
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: `,event.data);
  const timestamp = new Date().getTime() + 10 * 1000;
  const title = 'Push Codelab';
  const options = {
    body: "SIRA AL",
    showTrigger: new TimestampTrigger(timestamp),
    icon: "./img/icons/android-chrome-512x512.png",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: "vibration-sample",
    timestamp:new Date().getTime() + 120 * 1000
  };

  event.waitUntil(setTimeout(() => {
     self.registration.showNotification(title, options)
  }, parseInt(event.data.text())+1));

  
  
});

workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4, else
// workbox.clientsClaim(); // Vue CLI 3 and Workbox v3.

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings(); // Only used with Vue CLI 3 and Workbox v3.
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

