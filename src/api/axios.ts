import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: "https://fypbackend-production-d00d.up.railway.app/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
