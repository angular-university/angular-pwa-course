


if ('serviceWorker' in navigator) {

   window.addEventListener('load', () => {
       navigator.serviceWorker.register('/sw.js', {
           scope: '/'
       })
       .then(registration => {

           console.log('Service worker registration completed');

       });
   });

}