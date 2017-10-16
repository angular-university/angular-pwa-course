
const VERSION = 'v9';


log('Installing Service Worker');


self.addEventListener('install', event => event.waitUntil(installServiceWorker()));


async function installServiceWorker() {

    log("Service Worker installation started ");

}

self.addEventListener('activate', () => {

    log('Service Worker activated');
});








function log(message, ...data) {
    if (data.length > 0) {
        console.log(VERSION, message, data);
    }
    else {
        console.log(message);
    }
}

















