import express from "express";
import mongoose from "mongoose";
import { login, signup } from "./routes/auth.js";
import bodyParser from "body-parser";
import cors from "cors";
import { createCard, deleteCard, displayCards, updateCard, updateCardIndexes } from "./routes/flashcardRoute.js";
import {createToDo, deleteToDo, displayToDos, updateToDo, updateToDoIndex} from "./routes/todoRoute.js";
import { dashboard, dashboardPasswordChange } from "./routes/dashboard.js";
import {
  deleteCollectionRoute,
  editCollectionRoute,
  getCollectionRoute,
  postCollectionRoute,
} from "./routes/collectionsRoute.js";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(
  mongoSanitize({
    allowDots: true,
    replaceWith: '_',
  }),
);

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
app.use("/", updateCardIndexes);

// To dos
app.use("/", createToDo);
app.use("/", deleteToDo);
app.use("/", displayToDos);
app.use("/", updateToDo);
app.use("/", updateToDoIndex);

const server = app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

server;

server.setTimeout(45000);

