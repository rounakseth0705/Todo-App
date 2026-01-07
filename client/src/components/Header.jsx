import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";

const Header = () => {
    const { userName, logout } = useContext(UserContext);
    const [hours, setHours] = useState(String(new Date().getHours()).padStart(2,"0"));
    const [minutes, setMinutes] = useState(String(new Date().getMinutes()).padStart(2,"0"));
    const [seconds, setSeconds] = useState(String(new Date().getSeconds()).padStart(2,"0"));
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
        <div className="flex justify-between">
            <div className="flex justify-center items-center p-2">
                <h1 className="p-1 font-semibold">Hello {userName},</h1>
                <h1 className="text-2xl text-red-500 p-1 font-bold">Good Afternoon!</h1>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center p-2 px-5">
                    <h1 className="font-semibold">Time:</h1>
                    <h1 className="text-red-500 font-semibold">{`${hours}:${minutes}:${seconds}`}</h1>
                </div>
                <button onClick={logout} className="px-5 mx-5 bg-red-500 rounded-lg text-white cursor-pointer active:bg-red-400 transition-all ease-in-out">Logout</button>
            </div>
        </div>
    )
}

export default Header;