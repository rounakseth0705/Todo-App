import { createContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../api.js";

export const UserContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userName, setUserName] = useState("");
    const login = async (state, credientials) => {
        try {
            const { data } = await API.post(state, credientials);
            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                navigate("/task-list");
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const logout = () => {
        try {
            localStorage.removeItem("token");
            setToken(null);
            setUserName("");
            navigate("/");
            toast.success("logged out successfully");
        } catch(error) {
            toast.error(error.message);
        }
    }
    const getUserName = async () => {
        const { data } = await API.get("/get-user-name");
        if (data.success) {
            setUserName(data.name);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserName();
        }
    },[]);
    const value = { userName, token, login, logout }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}