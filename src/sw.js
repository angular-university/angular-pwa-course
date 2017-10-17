
const VERSION = 'v17';


log('Installing Service Worker');


self.addEventListener('install', event => event.waitUntil(installServiceWorker()));


async function installServiceWorker() {

    log("Service Worker installation started ");

    const cache = await caches.open(getCacheName());

    self.skipWaiting();

    return cache.addAll([
        '/',
        '/polyfills.bundle.js',
        '/inline.bundle.js',
        '/styles.bundle.js',
        '/vendor.bundle.js',
        '/main.bundle.js',
        '/assets/bundle.css',
        '/assets/angular-pwa-course.png',
        '/assets/main-page-logo-small-hat.png'
    ]);

}

self.addEventListener('activate', () => activateSW());


async function activateSW() {

    log('Service Worker activated');

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        if (cacheKey !== getCacheName() ) {
            caches.delete(cacheKey);
        }
    });

    return clients.claim();
}


self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));



async function cacheThenNetwork(event) {

    log('Intercepting request: ' + event.request.url);

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




function getCacheName() {
    return "app-cache-" + VERSION;
}


function log(message, ...data) {
    if (data.length > 0) {
        console.log(VERSION, message, data);
    }
    else {
        console.log(VERSION, message);
    }
}

















