import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://foodiehub-restaurant-production.up.railway.app/api",
});

API.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");
  const isAdminRoute = config.url?.startsWith("/admin");
  const token = isAdminRoute ? adminToken : userToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
