

console.log("Generating VAPID keys ...");


const webpush = require('web-push');


// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();


console.log("VAPID Public Key: ", vapidKeys.publicKey);


console.log("VAPID Private Key: ", vapidKeys.privateKey);



/*

    VAPID key pair:  Voluntary Application Server Identification

    publicKey: "BIvC8I6yoFc-DZNgFTANsy9cae80mjWzTym7aB5zY45vBVZQK9VureFHvoh5ijW8EKG2I-g1YaN5rcKe_5AYrvM",

    privateKey: "Xox-dZU4rnLLkRlE5EzblVUrI3LbYj3a719F0a87UWI"

*/




