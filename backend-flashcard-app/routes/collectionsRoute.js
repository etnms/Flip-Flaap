import express from "express";
import {
  deleteCollection,
  editCollection,
  getCollection,
  postCollection,
} from "../controllers/collectionsController.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();

const getCollectionRoute = router.get("/api/collections", verifyToken, getCollection);

const postCollectionRoute = router.post("/api/collections", verifyToken, postCollection);

const deleteCollectionRoute = router.delete("/api/collections", verifyToken, deleteCollection);

const editCollectionRoute = router.put("/api/collections", verifyToken, editCollection);

export { deleteCollectionRoute, editCollectionRoute, getCollectionRoute, postCollectionRoute };
