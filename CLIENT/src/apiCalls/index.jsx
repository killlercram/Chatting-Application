import axios from "axios";

export const url = import.meta.env.VITE_BACKEND_URL ;

export const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")} `
  }
});