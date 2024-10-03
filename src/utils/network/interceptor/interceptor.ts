// lib/axiosInstance.js
import axios from "axios";

const interceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your API base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
interceptor.interceptors.request.use(
  function (config) {

    // Do something before the request is sent
    // For example, add an authentication token to the headers
    // const Token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);  

export default interceptor;
