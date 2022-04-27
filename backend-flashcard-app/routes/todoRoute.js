import express from "express";
import { createTodo, deleteTodo, displayTodos, updateTodo, updateToDoIndexes } from "../controllers/todoController.js";
import verifyToken from "../verifyToken.js";

const router = express.Router();


const createToDo = router.post("/api/todos", verifyToken, createTodo);

const deleteToDo = router.delete("/api/todos", verifyToken, deleteTodo);

const displayToDos = router.get("/api/todos", verifyToken, displayTodos);

const updateToDo = router.put("/api/todos", verifyToken, updateTodo);

const updateToDoIndex = router.put("/api/todos/index", verifyToken, updateToDoIndexes)

export { createToDo, deleteToDo, displayToDos, updateToDo, updateToDoIndex };
