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
                <div className="w-140 m-2 sm:m-1 md:w-180 lg:w-250">
                <TaskAdder/>
                <TaskList/>
                </div>
            </div>
        </>
    )
}

export default HomePage;