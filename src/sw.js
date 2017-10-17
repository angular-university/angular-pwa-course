
const VERSION = 'v9';


log('Installing Service Worker');


self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

/*

    These are the files that we want to download and install on the background

        '/',
        '/polyfills.bundle.js',
        '/inline.bundle.js',
        '/styles.bundle.js',
        '/vendor.bundle.js',
        '/main.bundle.js',
        '/assets/bundle.css',
        '/assets/angular-pwa-course.png',
        '/assets/main-page-logo-small-hat.png'
*/

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
        console.log(VERSION, message);
    }
}

















