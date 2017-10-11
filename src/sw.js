
const VERSION = 'v3';

function log(messages) {
    console.log(VERSION, messages);
}

log('Installing Service Worker');


self.addEventListener('install', () => {

    log('version is installed');

});


self.addEventListener('activate', () => {

    log('version is activated');

});