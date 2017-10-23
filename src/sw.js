const VERSION = 'v20';

importScripts("assets/idb.js");

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


let indexedDB;

async function activateSW() {

    log('Service Worker activated');

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        if (cacheKey !== getCacheName()) {
            caches.delete(cacheKey);
        }
    });

    indexedDB = self.idb.open('coursesDB', 1, upgradeDB => {
        upgradeDB.createObjectStore('lessonsStore');
    });

    return Promise.all(db, clients.claim());
}


self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));


async function cacheThenNetwork(event) {
    if (event.request.url.startsWith("/api/lessons")) {
        return handleAPIRequest(event);
    }
    else {
        return handleResourceBundleRequest(event);
    }
}


async function handleAPIRequest(event) {
    try {

        log('API request, calling network: ' + event.request.url);

        const response = await fetch(event.request);

        log('API results from network: ' + event.request.url);

        await saveLessonsToIndexedDB(response);

        return response;
    }
    catch (error) {
        return readLessonsFromIndexedDB();
    }
}

async function saveLessonsToIndexedDB(response) {

    const lessons = JSON.parse(response.body);

    log('Saving lessons to Indexed DB: ' + lessons);

    const db = await indexedDB;

    const tx = db.transaction('lessonsStore', 'write');

    tx.objectStore('lessonsStore').put("lessons", lessons);

    return tx.complete;

}


async function readLessonsFromIndexedDB() {

    const db = await indexedDB;

    const tx = db.transaction('lessonsStore', 'read');

    const lessons = await tx.objectStore('lessonsStore').get("lessons");

    return new Response(lessons);
}


async function handleResourceBundleRequest(event) {

    const cache = await caches.open(getCacheName());

    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
        log('served from Cache storage: ' + event.request.url);
        return cachedResponse;
    }

    const networkResponse = await fetch(event.request);

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

















