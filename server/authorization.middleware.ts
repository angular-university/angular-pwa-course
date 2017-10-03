
import {Request, Response, NextFunction} from 'express';
import * as _ from 'lodash';

export function checkIfAuthorized(
    allowedRoles: string[],
    req: Request,
    res: Response,
    next: NextFunction) {


    const userInfo = req['user'];

    const roles = _.intersection(userInfo.roles, allowedRoles);

    if (roles.length > 0) {
        next();
    }
    else {
        res.sendStatus(403);
    }

}