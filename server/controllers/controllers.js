import { taskModel, userModel } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        return res.json({ success: true, token: token, message: "Sign up successful" });
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
        return res.json({ success: true, token: token, message: "Logged In successfully" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}

export const getUserName = async (req,res) => {
    try {
        return res.json({ success: true, name: req.user.name, message: "User name" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}

export const addTask = async (req,res) => {
    try {
        const { task } = req.body;
        if (!task) {
            return res.json({ success: false, message: "Missing task" });
        }
        const time = new Date().getTime();
        const id = req.user._id;
        if (!id) {
            return res.json({ success: false, message: "User not logged in" });
        }
        await taskModel.create({ id, task, time });
        return res.json({ success: true, message: "Task Added" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}

export const deleteTask = async (req,res) => {
    try {
        const { task } = req.body;
        if (!task) {
            return res.json({ success: false, message: "Missing task to delete" });
        }
        const id = req.user._id;
        const time = new Date().getTime();
        if (!id) {
            return res.json({ success: false, message: "User not logged in" });
        }
        await taskModel.deleteOne({ id, task, time });
        return res.json({ success: true, message: "Task deleted" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}

export const getTasks = async (req,res) => {
    try {
        const id = req.user._id;
        if (!id) {
            return res.json({ success: false, message: "User not logged in" });
        }
        const tasks = await taskModel.find({ id });
        return res.json({ success: true, tasks: tasks, message: "Tasks assigned by the user" });
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}