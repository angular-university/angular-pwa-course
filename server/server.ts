
import * as express from 'express';
import {Application} from "express";
import {readAllLessons} from "./read-all-lessons.route";
import {addPushSubscriber} from "./add-push-subscriber.route";
import {sendNewsletter} from "./send-newsletter.route";
const bodyParser = require('body-parser');

const webpush = require('web-push');

// TODO replace these keys
const vapidKeys = {
    publicKey: "BIvC8I6yoFc-DZNgFTANsy9cae80mjWzTym7aB5zY45vBVZQK9VureFHvoh5ijW8EKG2I-g1YaN5rcKe_5AYrvM",
    privateKey: "Xox-dZU4rnLLkRlE5EzblVUrI3LbYj3a719F0a87UWI"
};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


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
const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});









