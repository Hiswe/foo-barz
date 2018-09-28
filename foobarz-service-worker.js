importScripts("/precache-manifest.177298018d9cc52509097977b05ab6eb.js", "/workbox-v3.6.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/workbox-v3.6.1"});
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

