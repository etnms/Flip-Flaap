import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Flashcard = new Schema({
    concept: {type: String, required: true},
    definition: {type: String, required: true},
    date: {type: Date}
})

export default mongoose.model("Flashcard", Flashcard);