import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    uniqueId : { type: Number, required: true }
});

export const userModel = mongoose.model("user", userSchema);
export const taskModel = mongoose.model("task",taskSchema);