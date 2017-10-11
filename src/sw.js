
const VERSION = 'v8';


log('Installing Service Worker');


self.addEventListener('install', event => event.waitUntil(installServiceWorker()));


async function installServiceWorker() {

    log("Service Worker installation started ");

    const request = new Request('offline.html');

    const response = await fetch(request);

    log("response received after loading offline.html", response);

    if (response.status !== 200) {
        throw new Error('Could not load offline page!');
    }

    const cache = await caches.open('app-cache');

    cache.put(request, response);

    log("Cached offline.html");

}

self.addEventListener('activate', () => {

    log('version is activated');

});


self.addEventListener('fetch', event => event.respondWith(showOfflineIfError(event)));


async function showOfflineIfError(event) {


    let response;

    try {

         log('Calling network: ' + event.request.url);

         response = await fetch(event.request);

    }
    catch(err) {

        log( 'Network request Failed. Serving offline page ', err );

        const cache = await caches.open('app-cache');

        response = cache.match("offline.html");

    }

    return response;
}





function log(message, ...data) {
    if (data.length > 0) {
        console.log(VERSION, message, data);
    }
    else {
        console.log(message);
    }
}

















