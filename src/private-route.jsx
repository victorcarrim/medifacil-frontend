import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./assets/api/context/authContext";

export const PrivateRoute = () => {
    const { isLogged } = useContext(AuthContext);
    return isLogged ? <Outlet /> : <Navigate to={'/'} />;
}