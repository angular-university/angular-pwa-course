
import * as express from 'express';
import {Application} from "express";
import {readAllLessons} from "./read-all-lessons.route";
const bodyParser = require('body-parser');



const app: Application = express();


app.use(bodyParser.json());


// REST API
app.route('/api/lessons')
    .get(readAllLessons);


// launch an HTTP Server
const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at https://localhost:" + httpServer.address().port);
});









