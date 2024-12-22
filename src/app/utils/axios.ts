import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api-backend",
});

export const axiosPrivateInstance = axios.create({
  baseURL: "/api-backend",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
