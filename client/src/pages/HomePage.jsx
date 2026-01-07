import Header from "../components/Header";
import Heading from "../components/Heading";
import TaskAdder from "../components/TaskAdder";
import TaskList from "../components/TaskList";

const HomePage = () => {
    return(
        <>
            <Header/>
            <Heading/>
            <div className="flex justify-center items-center">
                <div className="w-250">
                <TaskAdder/>
                <TaskList/>
                </div>
            </div>
        </>
    )
}

export default HomePage;