import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Todo are just a different type of flashcard
// New model but the logic to deal with them in the backend is similar 

const Flashcard = new Schema({
    concept: {type: String, required: true},
    definition: {type: String, required: true},
    date: {type: Date}
})

export default mongoose.model("Flashcard", Flashcard);