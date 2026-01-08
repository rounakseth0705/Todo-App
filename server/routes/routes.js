import express from "express";
import { addTask, deleteTask, getTasks, getUserName, login, signUp } from "../controllers/controllers.js";
import { authUser } from "../middleware/authUser.js";

const routes = express.Router();

routes.post("/sign-up", signUp);
routes.post("/login", login);
routes.get("/get-user-name", authUser, getUserName);
routes.post("/add-task", authUser, addTask);
routes.post("/delete-task/:id", authUser, deleteTask);
routes.get("/get-tasks", authUser, getTasks);

export default routes;