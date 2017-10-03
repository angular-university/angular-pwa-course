//This is the "Offline page" service worker

if ("serviceWorker" in navigator) {

    //Add this below content to your HTML page, or add the js file to your page at the very top to register sercie worker
    if (navigator.serviceWorker.controller) {
        console.log('Active service worker found, no need to register')
    } else {
        //Register the ServiceWorker
        navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        }).then(function(reg) {
            console.log('New Service worker is now registered');
        });
    }


}


