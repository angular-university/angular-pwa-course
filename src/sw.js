

const VERSION = 'v16';

function getCacheName() {
    return "app-cache-" + VERSION;
}

function log(messages) {
    console.log(VERSION, messages);
}


// Install stage sets up the offline page in the cahche and opens a new cache
self.addEventListener('install', event => event.waitUntil(installServiceWorker()));




async function installServiceWorker() {

    log("Service Worker installation ongoing ");

    self.skipWaiting();

    const request = new Request('offline.html');

    const response = await fetch(request);

    log("response received after loading offline.html", response);

    if (response.status !== 200) {
        throw new Error('Could not load offline page!');
    }

    const cache = await caches.open(getCacheName());

    cache.put(request, response.clone());
    log("Cached offline.html");

    return cache.addAll([
        '/',
        '/polyfills.bundle.js',
        '/inline.bundle.js',
        '/styles.bundle.js',
        '/vendor.bundle.js',
        '/main.bundle.js',
        '/assets/bundle.css',
        '/api/lessons',
        '/assets/angular-pwa-course.png',
        '/assets/main-page-logo-small-hat.png'
    ]);
}





self.addEventListener('activate', event => activateServiceWorker(event) );


async function activateServiceWorker(event) {

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        if (cacheKey !== getCacheName() ) {
            caches.delete(cacheKey);
        }
    });

    log("Service Worker Activated, cache ready ");
    return clients.claim();
}





// Detect failing HTTP requests, show the offline page instead
self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));



async function cacheThenNetwork(event) {

    const cache = await caches.open(getCacheName());

    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
        log('From Cache: ' + event.request.url);
        return cachedResponse;
    }

    const networkResponse = await fetch(event.request);

    log('Calling network: ' + event.request.url);

    return networkResponse;
}




async function showOffLinePage(event) {

    let response;

    try {
        response = await fetch(event.request);
        log('Calling network: '+ event.request.url);
    }
    catch(error) {

        log( 'Network request Failed. Serving offline page ', error );

        const cache = await caches.open(getCacheName());

        response = cache.match("offline.html");
    }

    return response;
}





















