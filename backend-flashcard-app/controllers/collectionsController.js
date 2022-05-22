import jwt from "jsonwebtoken";
import Collection from "../models/collections.js";
import User from "../models/user.js";
import async from "async";
import Flashcard from "../models/flashcard.js";
import Todo from "../models/todo.js";

const getCollection = (req, res) => {
  jwt.verify(req.token, process.env.JWTKEY, (err, authData) => {
    if (err) return res.status(400);
    User.findById(authData.user._id).exec((err, result) => {
      if (err) return res.status(400).json({ error: "Error login" });
      else
        async.parallel(
          {
            collections: (callback) => {
              Collection.find({ user: result }).populate("name").exec(callback);
            },
          },
          (err, results) => {
            if (err) {
              return res.status(400).send(err);
            }
            return res.status(200).json({ results });
          }
        );
    });
  });
};

const postCollection = (req, res) => {
  const name = req.body.name;
  const type = req.body.type;

  if (name.length > 80) return res.status(400).json({ error: "Name too long" });

  jwt.verify(req.token, process.env.JWTKEY, (err, authData) => {
    if (err) return res.sendStatus(403);
    else {
      User.findOne({ username: authData.user.username }).exec((err, result) => {
        if (err) return res.status(400).json({ error: "Error creation collection" });

        if (result) {
          new Collection({
            name,
            user: result,
            type,
          }).save((err, result) => {
            if (err) return res.status(400).json({ error: "Error field empty" });
            else return res.status(200).json({ message: "Collection created", _id: result._id });
            //name: result.name, _id: result._id, user: result.user.name,
          });
        }
      });
    }
  });
};

const deleteCollection = (req, res) => {
  const _id = req.body._id;

  jwt.verify(req.token, process.env.JWTKEY, (err) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      Collection.findById({ _id }, (err, res) => {
        if (err) return res.status(400).json({ error: "Error deleting collection" });
        const arrayCards = res.flashcards;
        const arrayTodos = res.todos;
        if (arrayCards.length > 0) {
          arrayCards.forEach((card) => {
            Flashcard.findByIdAndDelete({ _id: card }, (err, res) => {
              if (err) console.log(err);
            });
          });
        }
        if (arrayTodos.length > 0) {
          arrayTodos.forEach((todo) => {
            Todo.findByIdAndDelete({ _id: todo });
          });
        }
      });

      Collection.deleteOne({ _id }, (err) => {
        if (err) return res.status(400).json({ error: "Error deleting collection" });
        else return res.status(200).json({ message: "Successfully deleted" });
      });
    }
  });
};

const editCollection = (req, res) => {
  const _id = req.body._id;
  const name = req.body.name;

  jwt.verify(req.token, process.env.JWTKEY, (err) => {
    if (err) {
      return res.sendStatus(403);
    }
    Collection.findByIdAndUpdate({ _id }, { name }, (err) => {
      if (err) {
        return res.status(400).json({ error: "Problem renaming collection" });
      }
      return res.status(200).json({ message: "Collection name updated" });
    });
  });
};

export { deleteCollection, editCollection, getCollection, postCollection };
