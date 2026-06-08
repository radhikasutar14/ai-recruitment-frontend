import {Link , useNavigate} from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login")
    }

    return(
        <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
                ATS Platform
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                    {user?.role == "candidate" && (
                        <>
                            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
                            <Link to="/candidate/dashboard" className="hover:text-gray-300 transition">My Applications</Link>
                            <Link to="/saved-jobs" className="hover:text-gray-300 transition">Saved Jobs</Link>
                            <Link to="/upload-resume" className="hover:text-gray-300 transition">Upload Resume</Link>
                        </>
                    )}
                    {user?.role == "recruiter" && (
                        <>
                            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
                            <Link to="/post-job" className="hover:text-gray-300 transition">Post Job</Link>
                            <Link to="/recruiter/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
                        </>
                    )}
                        <p>Welcome {user.name}</p>
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 px-4 py-2 rounded">
                                Logout
                        </button>
                    </>
                ): (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" >Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
};

export default Navbar;