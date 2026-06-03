
import { create } from "zustand";
//store --> global memory
//state --> data
//action --> function changing data
interface User {
    _id : string;
    name : string;
    email : string;
    role : string;
}
//defines the shape of zustand function data + function store contains
//data => user and token holds values
//functions => setuser, setToken and logoutwhich used for modify values
interface AuthState {
    user : User | null;
    token : string | null;

    setUser : (user : User) => void;                    //void is function which returns nothing
    setToken : (token : string) => void;
    logout : () => void;
}

const useAuthStore = create<AuthState>((set) => ({         //it is actually custom hook 
    user : JSON.parse(localStorage.getItem("user") || "null"),
    token : localStorage.getItem("token") || null,

    setUser : (user) => { 
        localStorage.setItem("user",JSON.stringify(user));
        set({user})
     },
    setToken : (token) => {
        localStorage.setItem("token",token);
        set({token})
    },             //zustand internal updater function


    logout : () =>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        set({
            user : null,
            token : null
        })
    }
}));

export default useAuthStore;

