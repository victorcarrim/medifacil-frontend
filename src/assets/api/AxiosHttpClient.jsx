import axios from "axios";

export const authApi = axios.create({
    baseURL: "https://medifacil-backend.vercel.app/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Configura o interceptador para adicionar o token de autenticação
authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("@auth:token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
