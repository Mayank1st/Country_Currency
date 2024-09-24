import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://country-currency-sp3l.onrender.com/api",
  withCredentials: true, 
});

export default axiosInstance;
