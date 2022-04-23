import async from "async";
import Collection from "../models/collections.js";
import Flashcard from "../models/flashcard.js";
import jwt from "jsonwebtoken";

const displayFlashcards = (req, res) => {
  jwt.verify(req.token, process.env.JWTKEY, (err) => {
    if (err) return res.sendStatus(403);

    const _id = req.query.currentCollectionId;

    async.parallel(
      {
        collections: (callback) => {
          Collection.findById(_id).populate("flashcards").exec(callback);
        },
      },
      (err, results) => {
        if (err) return res.status(400);

        return res.status(200).json({ results });
      }
    );
  });
};

const createFlashcard = (req, res) => {
  const concept = req.body.concept;
  const definition = req.body.definition;
  const _id = req.body._id;
  const date = new Date();
  
  new Flashcard({
    concept,
    definition,
    date,
  }).save((err, result) => {
    if (err) return res.status(400).json({ message: "Error field empty" });
    else {
      Flashcard.findById(result._id, (err) => {
        if (err) {
          return res.status(400).json({ message: "Error adding flashcard to collection" });
        } else {
          jwt.verify(req.token, process.env.JWTKEY, (err) => {
            if (err)  return res.sendStatus(403);
            else {

              Collection.findByIdAndUpdate(
                { _id },
                { $push: { flashcards: result } },
                (err) => {
                  if (err) return res.status(400).json({ message: "Error adding flashcard to collection" });
                }
              );
            }
          });
        }
      });
      return res.status(200).json({ message: "Flashcard created!" });
    }
  });
};

const deleteFlashcard = (req, res) => {
  const _id = req.body._id;
  const name = req.body.name;

  jwt.verify(req.token, process.env.JWTKEY, (err) => {
    if (err) return res.sendStatus(403);
    else {
      Flashcard.findByIdAndDelete({ _id }, (err) => {
        if (err) return res.status(400).json({ message: "Error while deleting flashcard" });
        else {
          Collection.findOneAndUpdate({ name }, { $pull: { flashcards: _id } }, (err) => {
            if (err) return res.status(400).json({ message: "Error del flashcard from collect" });
            return res.status(200).json({ message: "Flashcard deleted" });
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

  jwt.verify(req.token, process.env.JWTKEY, (err) => {
    if (err) return res.sendStatus(403);
    else {
      Flashcard.findByIdAndUpdate({ _id }, { concept, definition }, (err) => {
        if (err) return res.sendStatus(403);
        return res.status(200).json({ message: "Flashcard was updated" });
      });
    }
  });
};

export { createFlashcard, deleteFlashcard, displayFlashcards, updateFlashcard };
