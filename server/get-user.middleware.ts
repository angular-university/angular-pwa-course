


import {decodeJwt} from "./security.utils";
import {Request, Response, NextFunction} from 'express';


export function retrieveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {

    const jwt = req.cookies["SESSIONID"];

    if (jwt) {
        handleSessionCookie(jwt, req)
            .then(() => next())
            .catch(err => {
                console.error(err);
                next();
        })
    }
    else {
      next();
    }
}



async function handleSessionCookie(jwt:string, req: Request) {
    try {

        const payload = await decodeJwt(jwt);

        req["user"] = payload;

    }
    catch(err) {
        console.log("Error: Could not extract user from request:", err.message);
    }
}






