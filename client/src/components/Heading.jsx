import listIcon from "../assets/icon.svg";

const Heading = () => {
    return(
        <div className="flex justify-center items-center m-1">
            <h1 className="text-3xl font-bold">To Do List</h1>
            <img className="h-10 w-15 p-1" src={listIcon} alt="listIcon" />
        </div>
    )
}

export default Heading;