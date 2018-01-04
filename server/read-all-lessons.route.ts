
import {db} from "./database";


export function readAllLessons(req, res) {

    res.status(200).json({lessons:db.readAllLessons()});

}