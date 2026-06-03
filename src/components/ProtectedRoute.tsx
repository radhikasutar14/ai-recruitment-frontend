import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

interface ProtectedRouteProps {
    children : React.ReactNode,
    role : string
};

const ProtectedRoute = ({children , role} : ProtectedRouteProps) => {
    const { user, token } = useAuthStore();

    //if user is not logged in
    if(!token){
        return <Navigate to="/login"/>
    }

    //check the role of user
    if(role && user?.role !== role){
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute;