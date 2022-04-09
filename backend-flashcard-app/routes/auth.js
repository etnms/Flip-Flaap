import express from "express";
import { userLogin, userSignup } from "../controllers/authController.js";

const router = express.Router();

const login = router.post("/api/login", userLogin);

const signup = router.post("/api/signup", userSignup);

export {login, signup};