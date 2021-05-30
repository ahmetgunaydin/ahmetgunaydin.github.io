importScripts("precache-manifest.e4e63eeb75f95483c1d944ecb66d13a6.js", "workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
console.log("local sw")
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

workbox.core.clientsClaim(); // Vue CLI 4 and Workbox v4, else
// workbox.clientsClaim(); // Vue CLI 3 and Workbox v3.

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings(); // Only used with Vue CLI 3 and Workbox v3.
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

