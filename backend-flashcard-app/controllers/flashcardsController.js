import async from "async";
import Collection from "../models/collections.js";
import Flashcard from "../models/flashcard.js";
import jwt from "jsonwebtoken";

const displayFlashcards = (req, res) => {
  const name = req.query.currentCollection;

  async.parallel(
    {
      collections: (callback) => {
        Collection.find({ name }).populate("flashcards").exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json({ results });
      return;
    }
  );
};

const createFlashcard = (req, res) => {
  const concept = req.body.concept;
  const definition = req.body.definition;
  const date = new Date();
  new Flashcard({
    concept,
    definition,
    date,
  }).save((err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      Flashcard.findById(result._id, (err) => {
        if (err) {
          console.log(err);
          res.status(400).json({ message: "Error adding flashcard to collection" });
          return;
        } else {
          Collection.findOneAndUpdate({ name: req.body.name }, { $push: { flashcards: result } }, (err) => {
            if (err) {
              console.log(err);
              res.status(400).json({ message: "Error adding flashcard to collection" });
              return;
            }
          });
        }
      });
      res.status(200).json({ message: "Flashcard created!" });
      return;
    }
  });
};

const deleteFlashcard = (req, res) => {
  const _id = req.body._id;
  const name = req.body.name;

  jwt.verify(req.token, "secretkey", (err) => {
    if (err) {
      res.status(403);
    } else {
      Flashcard.findByIdAndDelete({ _id }, (err) => {
        if (err) {
          res.status(400).json({ message: "Error while deleting flashcard" });
        } else {
          Collection.findOneAndUpdate({ name }, { $pull: { flashcards: _id } }, (err) => {
            if (err) {
              console.log(err);
              res.status(400).json({ message: "Error del flashcard from collect" });
            }
            res.status(200).json({ message: "Flashcard deleted" });
          });
        }
      });
    }
  });
};

const updateFlashcard = (req, res) => {
  const _id = req.body._id;
  const concept = req.body.concept;
  const definition = req.body.definition;
  
  jwt.verify(req.token, "secretkey", (err) => {
    if (err) {
      res.status(403);
    } else {
      Flashcard.findByIdAndUpdate({ _id }, { concept, definition }, (err, result) => {
        if (err) {
          res.status(403);
          return;
        }
        res.status(200).json({ message: "Flashcard was updated", result });
      });
    }
  });
};

export { createFlashcard, deleteFlashcard, displayFlashcards, updateFlashcard };
