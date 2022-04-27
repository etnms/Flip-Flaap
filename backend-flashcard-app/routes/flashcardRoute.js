import express from "express";
import { createFlashcard, deleteFlashcard, displayFlashcards, updateFlashcard, updateFlashcardIndexes } from "../controllers/flashcardsController.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();

const createCard = router.post("/api/flashcards", verifyToken, createFlashcard);

const displayCards = router.get("/api/flashcards", verifyToken, displayFlashcards);

const deleteCard = router.delete("/api/flashcards", verifyToken, deleteFlashcard);

const updateCard = router.put("/api/flashcards", verifyToken, updateFlashcard);

const updateCardIndexes = router.put("/api/flashcards/index", verifyToken, updateFlashcardIndexes);

export { createCard, deleteCard, displayCards, updateCard, updateCardIndexes };
