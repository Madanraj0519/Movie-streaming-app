import axios from "axios";
import { BASE_BACKEND_URL } from "./constant";


const axiosInstance = axios.create({
    baseURL : BASE_BACKEND_URL,
    timeout : 10000,
    withCredentials : true,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;