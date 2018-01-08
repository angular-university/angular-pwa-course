
import {USER_SUBSCRIPTIONS} from "./in-memory-db";

const webpush = require('web-push');


export function sendNewsletter(req, res) {

    console.log('All Newsletter subscriptions', JSON.stringify(USER_SUBSCRIPTIONS));

    Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(sub, 'Newsletter Available ...')))
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}

