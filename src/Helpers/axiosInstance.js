import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pizza-palace-1.onrender.com",
  withCredentials: true,
});

// Attach Bearer token from localStorage on every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
