
import * as express from 'express';
import {Application} from "express";
import {readAllLessons} from "./read-all-lessons.route";
import {addPushSubscriber} from "./add-push-subscriber.route";
import {sendNewsletter} from "./send-newsletter.route";
const bodyParser = require('body-parser');

const webpush = require('web-push');


const vapidKeys = {
    publicKey: "TODO",
    privateKey: "TODO"
};

/*

    TODO - uncomment after generating your VAPID keys

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

*/


const app: Application = express();


app.use(bodyParser.json());


// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/newsletter')
    .post(sendNewsletter);



// launch an HTTP Server
const httpServer:any = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});









