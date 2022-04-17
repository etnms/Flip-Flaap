import jwt from "jsonwebtoken";

const checkUserLogin = (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) return res.sendStatus(403);
    else return res.json(authData.user.username);
  });
};

export { checkUserLogin };
