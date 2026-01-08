import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const { userName, logout } = useContext(UserContext);
    const [hours, setHours] = useState(String(new Date().getHours()).padStart(2,"0"));
    const [minutes, setMinutes] = useState(String(new Date().getMinutes()).padStart(2,"0"));
    const [seconds, setSeconds] = useState(String(new Date().getSeconds()).padStart(2,"0"));
    const handleLogout = () => {
        logout();
        navigate("/");
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setHours(String(new Date().getHours()).padStart(2,"0"));
            setMinutes(String(new Date().getMinutes()).padStart(2,"0"));
            setSeconds(String(new Date().getSeconds()).padStart(2,"0"));
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [])
    return(
        <div className="flex justify-between items-center">
            <div className="flex justify-center items-center p-2">
                <h1 className="p-1 font-semibold sm:text-md">Hello {userName},</h1>
                <h1 className="text-md text-red-500 p-1 font-bold sm:text-2xl">Good { hours <= 11 && hours > 4 ? "Morning" : hours >= 12 && hours <= 15 ? "Afternoon" : hours >=16 && hours <=20 ? "Evening" : "Night" }!</h1>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center p-2 px-2 sm:px-5">
                    <h1 className="font-semibold">Time:</h1>
                    <h1 className="text-red-500 font-semibold">{`${hours}:${minutes}:${seconds}`}</h1>
                </div>
                <button onClick={handleLogout} className="px-3 mx-1 bg-red-500 rounded-lg text-white text-sm cursor-pointer active:bg-red-400 transition-all ease-in-out sm:mx-3 sm:px-5">Logout</button>
            </div>
        </div>
    )
}

export default Header;