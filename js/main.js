//Make Sure sw are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load',() => {
        navigator.serviceWorker
        .register('/service_workers/sw_cached_site.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err=>console.log('Service Worker: Error'))
    })
  }