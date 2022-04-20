import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Collection = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    name: {type: String, required: true},
    flashcards: [{type: Schema.Types.ObjectId, ref: "Flashcard"}],
    type: {type: String, required: true, unique: true}
})

export default mongoose.model("Collection", Collection);