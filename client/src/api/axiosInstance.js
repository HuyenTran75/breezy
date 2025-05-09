import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://breezy-backend-ivud.onrender.com"  // URL của backend trên Render
    : "http://localhost:5000"  // URL trong môi trường local
});


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;