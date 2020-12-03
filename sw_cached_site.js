const cacheName = 'v1';

//call install event
self.addEventListener('install',(e) =>  {
    console.log('Service Worker: Installed');
    
});

//call activate event
self.addEventListener('activate',(e)=> {
    console.log('Service Worker: Activated');
    //Remove unwated caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

//call Fecth Event
self.addEventListener('fetch', e =>{
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res=> {
           // Make Clone od resposnse
           const resClone = res.clone();
           // Open Cache
           caches
           .open(cacheName)
           .then(cache=>{
               //Add response to cache
               cache.put(e.request,resClone);
           });
           return res;
        }).catch(err=>caches.match(e.request).then(res => res))
    )
})