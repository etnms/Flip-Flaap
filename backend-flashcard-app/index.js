import express from "express";
import mongoose from "mongoose";
import { login, signup } from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import { createCard, deleteCard, displayCards, updateCard } from "./routes/flashcardRoute.js";
import {createToDo, deleteToDo, displayToDos, updateToDo} from "./routes/todoRoute.js";
import { dashboard, dashboardPasswordChange } from "./routes/dashboard.js";
import {
  deleteCollectionRoute,
  editCollectionRoute,
  getCollectionRoute,
  postCollectionRoute,
} from "./routes/collectionsRoute.js";
import dotenv from "dotenv";
const app = express();
const port = 8000;

app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000",
}));

dotenv.config()

const mongoDb = process.env.MONGOKEY;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Auth
app.use("/", login);
app.use("/", signup);

// Dashboard // Basic info
app.use("/", dashboard);
app.use("/", dashboardPasswordChange)

// Collections
app.use("/", getCollectionRoute);
app.use("/", postCollectionRoute);
app.use("/", deleteCollectionRoute);
app.use("/", editCollectionRoute);

// Cards
app.use("/", createCard);
app.use("/", deleteCard);
app.use("/", displayCards);
app.use("/", updateCard);

// To dos
app.use("/", createToDo);
app.use("/", deleteToDo);
app.use("/", displayToDos);
app.use("/", updateToDo);

const server = app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

server;

server.setTimeout(45000);

