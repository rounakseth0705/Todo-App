import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/userContext";
import { TaskProvider } from "./context/taskContext";

const App = () => {
    return(
        <>
            <AuthProvider>
                <TaskProvider>
                    <Toaster />
                    <Outlet />
                </TaskProvider>
            </AuthProvider>       
        </>
    )
}

export default App;