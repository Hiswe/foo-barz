importScripts("/precache-manifest.f1371778e651573127c1119eebb008f0.js", "/workbox-v3.6.2/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/workbox-v3.6.2"});
workbox.core.setCacheNameDetails({ prefix: 'foobarz-cache-v1' })

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerNavigationRoute('/index.html')

self.addEventListener('message', event => {
  if (!event.data) return
  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting()
      break
    default:
      break
  }
})

