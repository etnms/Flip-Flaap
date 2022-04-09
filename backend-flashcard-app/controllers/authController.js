import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.sendStatus(401).json({ message: "Empty fields" });
    return;
  }
  console.log("login part1");
  const user = await User.findOne({ username });
  console.log("login part2");
  if (user) {
    console.log("login part3");
    const hashPassword = await bcrypt.compare(password, user.password);
    if (hashPassword) {
      console.log("login part4");
      jwt.sign({ user }, "secretkey", (err, token) => {
        res.status(200).json({token});
      });
    } else {
      res.status(401).json({ message: "Incorrect username or password" });
    }
  } else {
    res.status(401).json({ message: "User does not exist" });
  }
};

const userSignup = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    }
    const user = new User({
      username,
      email,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        if (err.code === 11000 && err.keyPattern.username === 1) {
          res.status(400).json({ error: "Username already exists" });
          return;
        }
        if (err.code === 11000 && err.keyPattern.email === 1) {
          res.status(400).json({ error: "Email already exists" });
          return;
        } else {
          res.status(400).json({ error: "There was an error" });
          return;
        }
      } else {
        jwt.sign({ user }, "secretkey", (err, token) => {
          res.status(200).json({ token, message: "User created" });
        });
      }
    });
  });
};

export { userLogin, userSignup };
