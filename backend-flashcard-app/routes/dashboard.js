import express from "express";
import  verifyToken  from "../verifyToken.js";
import { checkUserLogin } from "../controllers/dashboardController.js";

const router = express.Router();

const dashboard = router.get("/api/dashboard", verifyToken, checkUserLogin)

export default dashboard;