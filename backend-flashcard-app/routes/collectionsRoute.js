import express from "express";
import {deleteCollection, getCollection, postCollection } from "../controllers/collectionsController.js";
import verifyToken from "../verifyToken.js"

const router = express.Router();

const getCollectionRoute = router.get("/api/collections", verifyToken, getCollection);

const postCollectionRoute = router.post("/api/collections", verifyToken, postCollection);

const deleteCollectionRoute = router.delete("/api/collections", verifyToken, deleteCollection);

export {deleteCollectionRoute, getCollectionRoute, postCollectionRoute };
