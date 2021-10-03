import axios from "axios";
import { apiBaseUrl } from "./apis";
import axiosRetry from "axios-retry";
import localStorageConstants from "src/constants/localstorageConstants";
import { store } from "src/redux/store";

const apiInstance = () => {
  const api = axios.create({
    baseURL: apiBaseUrl,
  });
  axiosRetry(api, { retries: 3 });

  api.interceptors.request.use(async (config) => {
    let accessToken = localStorage.getItem(localStorageConstants.accessToken);
    // console.log(accessToken, "tokennn");
    if (accessToken) {
      if (config.method !== "OPTIONS") {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
    }
    //config.headers["Access-Control-Allow-Origin"] = "*";

    // config.headers["Access-Control-Allow-Headers"] =
    //   "Content-Type,authorization";
    // config.headers["Access-Control-Allow-Methods"] =
    //   "DELETE, GET, HEAD,  OPTIONS, PATCH, POST, PUT";

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
      //throw error.response;
      throw error;
    }
  );

  return api;
};

const apiClient = apiInstance();

export default apiClient;
