import { useState } from "react";
import { loginUser } from "../api/authApi";
import useAuthStore  from "../store/authStore"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const {setUser , setToken} = useAuthStore();
    const navigate = useNavigate();
    
    const handleLogin = async(e : React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await loginUser({
                email,
                password
            });
            setUser(response.user);
            setToken(response.token);

            if(response.user.role === "candidate"){
                navigate("/candidate/dashboard");
            }else{
                navigate("/recruiter/dashboard")
            }
        }catch(error){
            console.log(error)
        }
        console.log(email, password);
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-md w-[400px]">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
                
                <input type="email" 
                placeholder="Enter Email Here...."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded mb-4"
                />

                <input type="password" 
                placeholder="Enter Password here...."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded mb-4"/>

                <button type="submit" 
                className="w-full bg-blue-500 text-white py-3 rounded">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;

