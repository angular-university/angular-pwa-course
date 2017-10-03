

console.log('Attempting to install service worker');


// Install stage sets up the offline page in the cahche and opens a new cache
self.addEventListener('install', event => event.waitUntil(installOfflinePage()));


async function installOfflinePage() {

    console.log("installing the service worker");

    const request = new Request('offline.html');

    const response = await fetch(request);

    console.log("response received after loading offline.html", response);

    if (response.status !== 200) {
        throw new Error('Could not load offline page!');
    }

    const cache = await caches.open("offline-page");

    console.log("Caching offline.html");
    cache.put(request, response);

    //TODO try these APIs
    // or cache.addAll(['/url'])  |  cache.add('url')

    console.log('Cached offline page: '+ response.url);
}



// Detect failing HTTP requests, show the offline page instead
self.addEventListener('fetch', event => event.respondWith(fallbackToOffline(event)));


async function fallbackToOffline(event) {

    console.log('Intercepting HTTP request:', event.request.url);

    let response;

    try {
        response = await fetch(event.request);
        console.log('HTTP request completed successfully');
    }
    catch(error) {

        console.log( 'Network request Failed. Serving offline page ' + error );
        const cache = await caches.open("offline-page");

        response = cache.match("offline.html");
    }

    return response;
}




//This is a event that can be fired from your page to tell the SW to update the offline page

/*

self.addEventListener('refreshOffline', function(response) {

    console.log("Triggered custom service worker event");

    return Promise.resolve({});
});


*/



















