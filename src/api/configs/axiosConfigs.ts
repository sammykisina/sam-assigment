import { Notifications } from "@/components";
import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  baseURL: "https://jsonplaceholder.typicode.com",
});

// defining a custom error handler for all APIs
const errorHandler = (error: any) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    Notifications.errorNotification(error.response.data.message);
    console.log(error);
  }

  return Promise.reject(error);
};

// registering the custom error handler to the "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
