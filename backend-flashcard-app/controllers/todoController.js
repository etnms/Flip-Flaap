import async from "async";
import Collection from "../models/collections.js";
import Todo from "../models/todo.js";
import jwt from "jsonwebtoken";

const displayTodos = (req, res) => {
  jwt.verify(req.token, process.env.JWTKEY, (err) => {
    if (err) return res.sendStatus(403);

    const _id = req.query.currentCollectionId;
    async.parallel(
      {
        collections: (callback) => {
          Collection.findById(_id).populate("todos").exec(callback);
        },
      },
      (err, results) => {
        if (err) return res.status(400);
        return res.status(200).json({ results });
      }
    );
  });
};
const createTodo = (req, res) => {
  const todo = req.body.definition; // Reuse front-end architecture from the flashcard, definition is a text-area
  const _id = req.body._id;
  const color = req.body.color;
  const date = new Date();

  new Todo({
    todo,
    color,
    date,
  }).save((err, result) => {
    if (err) return res.status(400).json({ message: "Error field empty" });
    else {
      Todo.findById(result._id, (err) => {
        if (err) {
          return res.status(400).json({ message: "Error adding Todo to collection" });
        } else {
          jwt.verify(req.token, process.env.JWTKEY, (err) => {
            if (err) return res.sendStatus(403);
            else {
              Collection.findByIdAndUpdate({ _id }, { $push: { todos: result } }, (err) => {
                if (err) return res.status(400).json({ message: "Error adding Todo to collection" });
              });
            }
          });
        }
      });
      return res.status(200).json({ message: "Todo created!" });
    }
  });
};

const deleteTodo = (req, res) => {
  const _id = req.body._id;
  const name = req.body.name;

  jwt.verify(req.token, process.env.JWTKEY, (err) => {
    if (err) return res.sendStatus(403);
    else {
      Todo.findByIdAndDelete({ _id }, (err) => {
        if (err) return res.status(400).json({ message: "Error while deleting Todo" });
        else {
          Collection.findOneAndUpdate({ name }, { $pull: { todos: _id } }, (err) => {
            if (err) return res.status(400).json({ message: "Error del Todo from collect" });
            return res.status(200).json({ message: "Todo deleted" });
          });
        }
      });
    }
  });
};

const updateTodo = (req, res) => {
  const _id = req.body._id;
  const todo = req.body.definition;
  const color = req.body.color;

  jwt.verify(req.token, process.env.JWTKEY, (err) => {
    if (err) return res.sendStatus(403);
    else {
      Todo.findByIdAndUpdate({ _id }, { todo, color }, (err) => {
        if (err) return res.sendStatus(403);
        return res.status(200).json({ message: "Todo was updated" });
      });
    }
  });
};

export { createTodo, displayTodos, deleteTodo, updateTodo };
