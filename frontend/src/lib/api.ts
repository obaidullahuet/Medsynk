import axios from "axios";
import { env } from "$env/dynamic/public";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";

const BASE_URL = env.PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// attach token to every request (only in browser)
api.interceptors.request.use((config) => {
    if (browser) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// handle 401 globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (browser && error.response?.status === 401) {
            localStorage.removeItem("token");
            console.log("🔒 401 Unauthorized - Redirecting to login");

            // Use SvelteKit's goto for better navigation
            goto("/login", { replaceState: true });
        }
        return Promise.reject(error);
    }
);

export default api;
