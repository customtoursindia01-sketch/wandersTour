import axios from "axios";

function resolveApiBase() {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  const onLocalHost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  if (fromEnv && !(fromEnv.includes("localhost") && !onLocalHost)) {
    return fromEnv.replace(/\/$/, "");
  }

  if (!onLocalHost && typeof window !== "undefined") {
    return "https://wanderstour.onrender.com/api";
  }

  return "http://localhost:5050/api";
}

const api = axios.create({
  baseURL: resolveApiBase(),
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
