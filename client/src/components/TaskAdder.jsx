import { useContext, useState } from "react";
import { TaskContext } from "../context/taskContext";

const TaskAdder = () => {
    const { title, setTitle, addTask } = useContext(TaskContext);
    const handleAddTask = () => {
        addTask(title);
    }
    return(
        <div className="flex justify-center items-center">
            <input onChange={(event) => setTitle(event.target.value)} value={title} className="w-[85%] outline-none p-4 bg-blue-50 rounded-3xl shadow-md text-gray-500" type="text" placeholder="Add new task"/>
            <button onClick={handleAddTask} className="flex justify-center items-center rounded-3xl bg-red-500 text-white w-[15%] p-4 cursor-pointer active:bg-red-400 transition-all ease-in-out">Add</button>
        </div>
    )
}

export default TaskAdder;