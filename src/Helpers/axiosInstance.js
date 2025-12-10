import axios from "axios";

const axiosInstance = axios.create(); //create axios instance

axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; //Set the base url

axiosInstance.defaults.withCredentials = true; //allow cookies to be sent with requests

export default axiosInstance;
