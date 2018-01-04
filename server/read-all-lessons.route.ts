
import {db} from "./database";


export function readAllLessons(req, res) {

    setTimeout(() => {

        res.status(200).json({lessons:db.readAllLessons()});


    }, 60000);


}