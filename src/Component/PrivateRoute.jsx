import { useContext } from "react";
import {UserContext} from "./UserContext";
import {Navigate} from "react-router-dom"

 export default function ProtectedRoute({children}){

    

    const { user } = useContext(UserContext);

    if (user === null) {
        return <div>Loading...</div>; // Avoid immediate redirect
    }
    return user.role!==""? children: <Navigate to="/login" />;

}