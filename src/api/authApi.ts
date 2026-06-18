import api from "./axios";
import type {LoginPayload , RegisterPayload} from "../types/auth"

export const registerUser = async(userData : RegisterPayload) => {
    const response = await api.post("/auth/register", userData);

    return response.data;
}


export const loginUser = async(userData : LoginPayload) => {
    const response = await api.post("/auth/login",userData);

    return response.data;
}
