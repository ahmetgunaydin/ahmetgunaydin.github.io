importScripts("precache-manifest.c7600c241dac8bcf2d08fd738f4a27ed.js", "workbox-v4.3.1/workbox-sw.js");
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
  event.waitUntil(self.clients.openWindow('/#/siraal'));
});


self.addEventListener('push', function(event) {

  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: `,event.data.json());
  var data= event.data.json();

  const timestamp = new Date().getTime() + 10 * 1000;
  const title = data.Title;


  const options = {
    body: data.Body,
    //showTrigger: new TimestampTrigger(timestamp),
    icon: "./img/icons/android-chrome-512x512.png",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    
    //timestamp:new Date().getTime() + 120 * 1000
  };
 
  event.waitUntil(self.registration.showNotification(title, options));

  
  
});

workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4, else
// workbox.clientsClaim(); // Vue CLI 3 and Workbox v3.

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings(); // Only used with Vue CLI 3 and Workbox v3.
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

