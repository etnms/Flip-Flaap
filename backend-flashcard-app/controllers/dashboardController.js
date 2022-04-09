import jwt from "jsonwebtoken";

const checkUserLogin =  (req, res, next) => {
  
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json(authData.user.username);// might want to change that to avoid extra info like email etc.
        }
    })
}


export {checkUserLogin};