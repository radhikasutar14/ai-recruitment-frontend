import { useState } from "react";
import { registerUser } from "../api/authApi";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState("");
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const {setUser , setToken} = useAuthStore();
    const navigate = useNavigate();

    const handleRegister = async(e : React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await registerUser({
                name,
                email,
                password,
                role
            });
            setUser(response.user);
            setToken(response.token);

            if(response.user.role === "candidate"){
                navigate("/candidate/dashboard");
            }else{
                navigate("/recruiter/dashboard")
            }
            console.log("register", response)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
            onSubmit={handleRegister}
            className="bg-white p-8 rounded-lg shadow-md w-[400px]">
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

                <input type="name" 
                className="w-full border p-3 rounded mb-4" 
                placeholder="Enter name here..."
                value={name}
                onChange={(e) =>setName(e.target.value)}/>

                <input type="email" 
                className="w-full border p-3 rounded mb-4" 
                placeholder="Enter email here..."
                value={email} 
                onChange={(e) =>setEmail(e.target.value)}/>


                <input type="password" 
                className="w-full border p-3 rounded mb-4" 
                placeholder="Enter password here..."
                value={password} 
                onChange={(e) =>setPassword(e.target.value)}/>


                <input type="role" 
                className="w-full border p-3 rounded mb-4" 
                placeholder="Enter role here..."
                value={role} 
                onChange={(e) =>setRole(e.target.value)}/>

                <button type="submit" 
                className="w-full bg-green-500 text-white py-3 rounded">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register;