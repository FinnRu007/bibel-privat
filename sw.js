var V="bibel-v6";
var CORE=["./","index.html","manifest.webmanifest","biblia-192.png","biblia-512.png","biblia-180.png","data/lut.js","data/elb32.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){});}));}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V;}).map(function(x){return caches.delete(x);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;
  var u=new URL(e.request.url),big=/\/data\//.test(u.pathname);
  /* Seite, Manifest und Icons: erst Netz (immer aktuell), sonst Cache. Daten: erst Cache. */
  if(big){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(n){var cp=n.clone();caches.open(V).then(function(c){c.put(e.request,cp);});return n;});}));return;}
  e.respondWith(fetch(e.request,{cache:"no-cache"}).then(function(n){if(n&&n.ok){var cp=n.clone();caches.open(V).then(function(c){c.put(e.request,cp);});}return n;}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("index.html");});}));});
