import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: "string", required: true, unique: true},
    email: {type: "string", required: true, unique: true},
    password: {type: "string", required: true}

})

export default mongoose.model("User", User)