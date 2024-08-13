import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import axios from "axios";

const api = axios.create({
    baseURL: "http://studcare.koreacentral.cloudapp.azure.com:9090",
    timeout: 10000,
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // Redirect to login page or refresh token logic
            window.location.href = '/login';
            console.log("403");
        }
        return Promise.reject(error);
    }
)

export default api;