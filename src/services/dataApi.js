import axios from "axios";
import { getCookie, removeCookie } from "../utils/cookie";

const dataApi = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

dataApi.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

dataApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        removeCookie("token");
        Router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default dataApi;
