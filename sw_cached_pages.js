const cacheName = 'v2';

const cacheAssets = [
    'index.html',
    'about.html',
    '/service_workers/css/style.css',
    '/service_workers/js/main.js'
];

//call install event
self.addEventListener('install',(e) =>  {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache =>{
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    );
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
        fetch(e.request).catch(()=> caches.match(e.request))
    )
})