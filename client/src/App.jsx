import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/userContext";

const App = () => {
    return(
        <>
            <AuthProvider>
                <Toaster />
                <Outlet />
            </AuthProvider>       
        </>
    )
}

export default App;