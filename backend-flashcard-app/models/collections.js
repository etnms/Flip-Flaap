import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Collection = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    name: {type: String, required: true},
    flashcards: [{type: Schema.Types.ObjectId, ref: "Flashcard"}],
    todos: [{type: Schema.Types.ObjectId, ref: "Todo"}],
    type: {type: String, required: true}
})

export default mongoose.model("Collection", Collection);