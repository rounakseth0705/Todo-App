import { createContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import API from "../apis/api.js";

export const UserContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const login = async (state, credientials) => {
        try {
            const { data } = await API.post(state, credientials);
            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setUserName(data.user.name);
                setUser(data.user);
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
            setUser(null);
            setUserName("");
            toast.success("logged out successfully");
        } catch(error) {
            toast.error(error.message);
        }
    }
    const getUser = async () => {
        try {
            const { data } = await API.get("/get-user");
            if (data.success) {
                setUser(data.user);
                setUserName(data.user.name);
            } else {
                toast.error("Cannot fetch the user");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUser();
        }
    }, []);
    const value = { userName, token, user, login, logout }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}