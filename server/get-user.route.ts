

import {Request, Response} from "express";
import {db} from "./database";



export function getUser(req:Request, res:Response) {

    const userInfo = req["user"];

    if (userInfo) {

        const user = db.findUserById(userInfo.sub);

        res.status(200).json({email:user.email, id:user.id, roles: user.roles});
    }
    else {
        res.sendStatus(204);
    }
}
