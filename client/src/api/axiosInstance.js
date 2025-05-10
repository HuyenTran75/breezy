import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://khoa-hoc-truc-tuyen.onrender.com", // hoặc lấy từ .env
  withCredentials: true, // <-- Quan trọng để gửi cookie qua CORS
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