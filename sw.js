var V="bibel-v1";
var CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png","data/lut.js","data/elb32.js"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){});}));}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V;}).map(function(x){return caches.delete(x);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(function(r){var net=fetch(e.request).then(function(n){if(n&&n.ok){var cp=n.clone();caches.open(V).then(function(c){c.put(e.request,cp);});}return n;}).catch(function(){return r;});return r||net;}));});
