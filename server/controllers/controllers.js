import { taskModel, userModel } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

export const signUp = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details" });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email id already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ success: true, user: user, token: token, message: "Sign up successful" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Missing details" });
        }
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.json({ success: false, message: "Invalid email" });
        }
        const existingUserPassword = await bcrypt.compare(password, existingUser.password);
        if (!existingUserPassword) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
        return res.json({ success: true, user: existingUser,  token: token, message: "Logged In successfully" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}

export const getUser = async (req,res) => {
    try {
        return res.json({ success: true, user: req.user, message: "User details" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}

export const addTask = async (req,res) => {
    try {
        const uniqueId = nanoid(8);
        const { title } = req.body;
        if (!title) {
            return res.json({ success: false, message: "Task not provided" });
        }
        const userId = req.user._id;
        if (!userId) {
            return res.json({ success: false, message: "User not logged in" });
        }
        const task = await taskModel.create({ userId, title, uniqueId });
        return res.json({ success: true, task: task, message: "Task Added" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}

export const deleteTask = async (req,res) => {
    try {
        const { uniqueId } = req.body;
        if (!uniqueId) {
            return res.json({ success: false, message: "Provide the id of the task" });
        }
        await taskModel.deleteOne({ uniqueId });
        return res.json({ success: true, message: "Task deleted" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}

export const getTasks = async (req,res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.json({ success: false, message: "User not logged in" });
        }
        const tasks = await taskModel.find({ userId });
        return res.json({ success: true, tasks: tasks, message: "Tasks assigned by the user" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}