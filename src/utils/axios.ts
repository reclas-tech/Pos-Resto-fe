import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api-backend",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateInstance = axios.create({
  baseURL: "/api-backend",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send HttpOnly cookie
});
