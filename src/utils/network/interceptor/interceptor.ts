// lib/axiosInstance.js
import axios from "axios";
import { LocalStorageHelper } from "../../others/local-storage-helper";
import { DataEncryption } from "../../others/data-encryption";
import { AuthApi } from "@/src/data-source/auth/apis/auth-api";

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
      console.log("userData", userData);
      if (userData) {
        config.headers.Authorization = `Bearer ${userData.accessToken}`;
      }
    }

    console.log("config", config);
    if (config.data) {
      const data = DataEncryption().encrypt(JSON.stringify(config.data));
      config.data = { data: data };
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
  async function (error) {
    if (error.response && error.response.status === 401) {
      const userData = LocalStorageHelper.getUser();
      if (userData) {
        // Set the refresh token into the header for the next request
        const data = await AuthApi.refreshTokenApi(userData.refreshToken);

        LocalStorageHelper.setUser({
          ...userData,
          accessToken: data.data.data?.accessToken, // Assuming the new access token is in data.data.accessToken
        });

        // Retry the original request
        return interceptor.request(error.config);
      }
    } else if (error.response.status === 410) {
      LocalStorageHelper.removeUser();
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);

export default interceptor;
