import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Todo = new Schema({
    todo: {type: String, required: true},
    color: {type: String},
    date: {type: Date},
})

export default mongoose.model("Todo", Todo);