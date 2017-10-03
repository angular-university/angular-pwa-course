


import {db} from "./database";
import {createSessionToken} from "./security.utils";

export function loginAsUser(req, res) {

    const impersonatedUserEmail = req.body.email;

    const impersonatedUser = db.findUserByEmail(impersonatedUserEmail);

    createSessionToken(impersonatedUser)
        .then(sessionToken => {

            res.cookie("SESSIONID", sessionToken,
                {httpOnly:true, secure:true});

            res.status(200).json({
                id:impersonatedUser.id,
                email: impersonatedUser.email,
                roles: impersonatedUser.roles
            });


        })
        .catch(err => {
                console.log("Error trying to login as user",err);
                res.sendStatus(500);
            });


}