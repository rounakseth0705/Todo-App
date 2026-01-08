import { useContext } from "react";
import { UserContext } from "./context/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const { user } = useContext(UserContext);
    return user ? (
        <>
            {children}
        </>
    ) : <Navigate to="/" replace />
}

export default ProtectedRoute;