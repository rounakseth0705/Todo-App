import { useContext } from "react";
import { TaskContext } from "../context/taskContext";

const TaskAdder = () => {
    const { title, setTitle, addTask } = useContext(TaskContext);
    const handleAddTask = () => {
        addTask(title);
        setTitle("");
    }
    return(
        <div className="flex justify-center items-center">
            <input onChange={(event) => setTitle(event.target.value)} value={title} className="w-[85%] outline-none p-4 py-2 bg-blue-50 rounded-xl shadow-md text-gray-500 sm:rounded-3xl sm:py-3 md:py-4" type="text" placeholder="Add new task"/>
            <button onClick={handleAddTask} className="flex justify-center items-center rounded-xl bg-red-500 text-white w-[15%] p-4 py-2 cursor-pointer active:bg-red-400 transition-all ease-in-out sm:rounded-3xl sm:py-3 md:py-4">Add</button>
        </div>
    )
}

export default TaskAdder;