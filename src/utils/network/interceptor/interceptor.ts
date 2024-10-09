// lib/axiosInstance.js
import axios from "axios";
import { LocalStorageHelper } from "../../others/local-storage-helper";
import { DataEncryption } from "../../others/data-encryption";

const interceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your API base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
interceptor.interceptors.request.use(
  function (config) {
    // Check if the request is for sign-in or sign-up API
    const isSignInOrSignUp =
      config.url?.includes("/login") || config.url?.includes("/register");

    if (!isSignInOrSignUp) {
      const userData = LocalStorageHelper.getUser(); // Retrieve auth token from localStorage
      if (userData) {
        config.headers.Authorization = `Bearer ${userData.accessToken}`;
      }
    }

    if (config.data) {
      // const data = DataEncryption().encrypt(JSON.stringify(config.data));
      // config.data = { data: data };
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

interceptor.interceptors.response.use(
  function (response) {
    const data = response.data.data;
    if (data) {
      response.data.data = JSON.parse(DataEncryption().decrypt(data));
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default interceptor;
