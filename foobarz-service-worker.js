importScripts("/precache-manifest.a928523adb065d4e916ae17c5ae19fb7.js", "/workbox-v3.4.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/workbox-v3.4.1"});
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

