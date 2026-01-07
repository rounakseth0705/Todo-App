import { useContext } from "react";
import { UserContext } from "./context/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const { token } = useContext(UserContext);
    return token ? (
        <>
            {children}
        </>
    ) : <Navigate to="/" replace />
}

export default ProtectedRoute;