import axios from "axios";
import { apiBaseUrl } from "./apis";
import axiosRetry from "axios-retry";
import localStorageConstants from "src/constants/localstorageConstants";

const apiInstance = () => {
  const api = axios.create({
    baseURL: apiBaseUrl,
  });
  axiosRetry(api, { retries: 3 });

  api.interceptors.request.use(async (config) => {
    let accessToken = localStorage.getItem(localStorageConstants.accessToken);
    if (accessToken) {
      if (config.method !== "OPTIONS") {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
    }

    console.log("REQUEST", config);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log("RESPONSE", response);

      if (localStorage?.getItem("userId")) {
        if (response.data?.status === "logout") {
          console.log(response.data, "response.data");
        }
      }
      return response;
    },
    (error) => {
      console.log("ERROR", error, error.response);
      throw error;
    }
  );

  return api;
};

const apiClient = apiInstance();

export default apiClient;
