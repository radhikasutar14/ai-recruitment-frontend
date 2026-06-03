import axios from "axios";

const api = axios.create({                      //pre-configured api object
    baseURL : import.meta.env.VITE_API_URL,
});
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;

//if we don't create instance then we again and again need to write axios.get("https://localhost:5000/api")
//because of above we only need toreturn api.get("/job")
//common backend url ---> https://localhost:5000/
//vite provides enviornment variable through import.meta.env