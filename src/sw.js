

const VERSION = 'v3';


// Install stage sets up the offline page in the cahche and opens a new cache
self.addEventListener('install', event => event.waitUntil(installOfflinePage()));


async function installOfflinePage() {

    console.log("Service Worker installation ongoing " + VERSION);

    self.skipWaiting();

    const request = new Request('offline.html');

    const response = await fetch(request);

    console.log("response received after loading offline.html", response);

    if (response.status !== 200) {
        throw new Error('Could not load offline page!');
    }

    const cache = await caches.open("app-page");

    console.log("Caching offline.html");
    cache.put(request, response.clone());

    //TODO try these APIs
    // or cache.addAll(['/url'])  |  cache.add('url')

    console.log('Cached offline page: '+ response.url);
}



self.addEventListener('activate', event => activateServiceWorker(event) );


async function activateServiceWorker(event) {
    console.log("Service Worker Activated, cache ready " +  VERSION);
    event.waitUntil(clients.claim());
}





// Detect failing HTTP requests, show the offline page instead
self.addEventListener('fetch', event => event.respondWith(fallbackToOffline(event)));


async function fallbackToOffline(event) {

    let response;

    try {
        response = await fetch(event.request);
        console.log('Calling network: ' + event.request.url);
    }
    catch(error) {

        console.log( 'Network request Failed. Serving offline page ' + error );

        const cache = await caches.open("app-page");

        response = cache.match("offline.html");
    }

    return response;
}


async function getCache() {

}






















