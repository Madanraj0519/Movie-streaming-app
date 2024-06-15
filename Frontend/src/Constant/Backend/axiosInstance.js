import axios from "axios";
import { BASE_BACKEND_URL } from "./constant";


const axiosInstance = axios.create({
    baseURL : BASE_BACKEND_URL,
    timeout : 10000,
    headers : {
        "Content-Type" : "application/json"
    },
});

export default axiosInstance;