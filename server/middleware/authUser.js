import jwt from "jsonwebtoken";
import { userModel } from "../models/models.js";

export const authUser = async (req,res,next) => {
    try {
        req.user = null;
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.json({ success: false, message: "User not logged in" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.json({ success: false, message: "Invalid User" });
        }
        req.user = user;
        next();
    } catch(error) {
        return res.json({ success: false, message: error.message });
    }
}