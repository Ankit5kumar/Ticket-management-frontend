import React from "react";
import { Navigate , Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";


const ProtectedRoute = ()=>{
    const {currentUser} = useAuth();
    return currentUser? <Outlet />:<Navigate to="/" />
}
export default ProtectedRoute;