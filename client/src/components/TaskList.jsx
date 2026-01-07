import { useEffect, useState } from "react";
import trash from "../assets/trash.svg";

const TaskList = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [day, setDay] = useState(String(new Date().getDate()).padStart(2,"0"));
    const [month, setMonth] = useState(String(new Date().getMonth()+1).padStart(2,"0"));
    const [year, setYear] = useState(new Date().getFullYear());
    const handleChange = (event) => {
        setIsChecked(event.target?.checked);
    }
    useEffect(() => {
        const date = setInterval(() => {
            setDay(String(new Date().getDate()).padStart(2,"0"));
            setMonth(String(new Date().getMonth()+1).padStart(2,"0"));
            setYear(new Date().getFullYear());
        }, 24*60*60*1000);
    }, [])
    return(
        <div className="mt-3 flex flex-col bg-blue-50 rounded-md p-4">
            <p className="underline text-red-500">{`Date: ${day}/${month}/${year}`}</p>
            <div className={`flex justify-between p-2 rounded-3xl m-1 ${isChecked ? "bg-gray-200" : "bg-gray-400"}`}>
                <input className="accent-red-500 bg-transparent" type="checkbox" checked={isChecked} onChange={handleChange} />
                <p className="font-semibold">Web Development Task</p>
                <img className="size-5 cursor-pointer" src={trash} alt="trash" />
            </div>
        </div>
    )
}

export default TaskList;