const VERSION = 'v20';

importScripts("/assets/idb.js");

log('Installing Service Worker');


self.addEventListener('install', event => event.waitUntil(installServiceWorker()));


async function installServiceWorker() {

    log("Starting Service Worker");

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

    log('Activating Service Worker');

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        if (cacheKey !== getCacheName()) {
            caches.delete(cacheKey);
        }
    });

    await clients.claim();

    log('Initializing IndexedDB...');

    indexedDB = idb.open('coursesDB', 1, upgradeDB => {

        log('IndexedDB lessonsStore created...');

        upgradeDB.createObjectStore('lessonsStore');
    });

    return indexedDB;
}


self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));


async function cacheThenNetwork(event) {
    log("Intercepting network request ", event.request.url);
    if (event.request.url.endsWith("/api/lessons")) {
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

        log('API results from network: ', response);

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

    const tx = db.transaction('lessonsStore', 'readonly');

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

















