const VERSION = 'v22';

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

    if (!('indexedDB' in self)) {
        return null;
    }

    log('Initializing IndexedDB...');

    indexedDB = idb.open('coursesDB', 1, upgradeDB => {

        log('IndexedDB lessonsStore created...');

        upgradeDB.createObjectStore('lessonsStore', { keyPath: "id"});
    });

    return indexedDB;
}


self.addEventListener('fetch', event => event.respondWith(cacheThenNetwork(event)));


async function cacheThenNetwork(event) {
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

        await saveLessonsToIndexedDB(response.clone());

        return response;
    }
    catch (error) {

        console.error("API call failed, reading from IndexedDB", error);

        return readLessonsFromIndexedDB();
    }
}

async function saveLessonsToIndexedDB(response) {

    const json = await response.json();

    const db = await indexedDB;

    const tx = db.transaction('lessonsStore', 'readwrite');

    log("API call successful, saving lessons in IndexedDB", json.lessons);

    json.lessons.forEach(lesson => tx.objectStore('lessonsStore').put(lesson) );

    return tx.complete;

}


async function readLessonsFromIndexedDB() {

    const db = await indexedDB;

    const tx = db.transaction('lessonsStore', 'readonly');

    const lessons = await tx.objectStore('lessonsStore').getAll();

    return new Response(JSON.stringify({lessons}));
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

















