const CACHE='vital-log-v2';
const ASSETS=['./index.html','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('api.anthropic.com'))return;
  if(e.request.url.includes('fonts.g')){e.respondWith(caches.open(CACHE).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(res=>{c.put(e.request,res.clone());return res;}).catch(()=>new Response('')))));return;}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>new Response(''))));
});
