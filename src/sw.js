

const VERSION = 'v6';


// Install stage sets up the offline page in the cahche and opens a new cache
self.addEventListener('install', event => event.waitUntil(installOfflinePage()));


function getCacheName() {
    return "app-page" + VERSION;
}



async function installOfflinePage() {

    console.log("Service Worker installation ongoing " + VERSION);

    self.skipWaiting();

    const request = new Request('offline.html');

    const response = await fetch(request);

    console.log("response received after loading offline.html", response);

    if (response.status !== 200) {
        throw new Error('Could not load offline page!');
    }

    const cache = await caches.open(getCacheName());

    console.log("Caching offline.html");
    cache.put(request, response.clone());

    //TODO try these APIs
    // or cache.addAll(['/url'])  |  cache.add('url')

    console.log('Cached offline page: '+ response.url);
}



self.addEventListener('activate', event => activateServiceWorker(event) );


async function activateServiceWorker(event) {

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        if (cacheKey !== getCacheName() ) {
            caches.delete(cacheKey);
        }
    });

    console.log("Service Worker Activated, cache ready " +  VERSION);
    return clients.claim();
}





// Detect failing HTTP requests, show the offline page instead
self.addEventListener('fetch', event => event.respondWith(fallbackToOffline(event)));


async function fallbackToOffline(event) {

    let response;

    try {
        response = await fetch(event.request);
        console.log('Calling network: ' + VERSION + ' ' + event.request.url);
    }
    catch(error) {

        console.log( 'Network request Failed. Serving offline page ' + error );

        const cache = await caches.open(getCacheName());

        response = cache.match("offline.html");
    }

    return response;
}





















