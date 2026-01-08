import { createContext, useEffect, useState } from "react";
import API from "../apis/api";
import toast from "react-hot-toast";

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const addTask = async (title) => {
        try {
            const { data } = await API.post("/add-task", { title });
            if (data.success) {
                setTasks([...tasks,data.task]);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const deleteTask = async (uniqueId) => {
        try {
            const { data } = await API.post(`/delete-task`, { uniqueId });
            if (data.success) {
                setTasks(prev => prev.filter((task) => task.uniqueId !== uniqueId));
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const getTasks = async () => {
        try {
            const { data } = await API.get("/get-tasks");
            if (data.success) {
                setTasks(data.tasks);
            } else {
                toast.error(data.message);
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getTasks();
        }
    }, [])
    const value = { tasks, title, setTitle, addTask, deleteTask }
    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}