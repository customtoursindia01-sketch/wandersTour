import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://wanderstour.onrender.com/api"
    : import.meta.env.VITE_API_URL || "http://localhost:5050/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("wit_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("wit_admin_token");
      localStorage.removeItem("wit_admin_user");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
