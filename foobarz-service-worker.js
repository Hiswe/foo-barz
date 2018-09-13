importScripts("/precache-manifest.bf00c583232e52a8c6a15ac5ea00481c.js", "/workbox-v3.5.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/workbox-v3.5.0"});
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

