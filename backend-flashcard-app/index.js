import express from "express";
import mongoose from "mongoose";
import { login, signup } from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import { createCard, deleteCard, displayCards, updateCard } from "./routes/flashcardRoute.js";
import dashboard from "./routes/dashboard.js";
import {
  deleteCollectionRoute,
  editCollectionRoute,
  getCollectionRoute,
  postCollectionRoute,
} from "./routes/collectionsRoute.js";
import "dotenv/config.js";
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
//app.use(dotenv.config);

const mongoDb = process.env.mongokey;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Auth
app.use("/", login);
app.use("/", signup);

// Dashboard // Basic info
app.use("/", dashboard);

// Collections
app.use("/", getCollectionRoute);
app.use("/", postCollectionRoute);
app.use("/", deleteCollectionRoute);
app.use("/", editCollectionRoute);

// Cards
app.use("/", createCard);
app.use("/", displayCards);
app.use("/", deleteCard);
app.use("/", updateCard);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
