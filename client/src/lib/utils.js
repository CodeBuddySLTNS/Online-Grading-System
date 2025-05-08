import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import config from "../../system.config.json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const axiosInstance = axios.create({
  baseURL: config.isProduction ? config.prodServer : config.devServer,
});

export const coleAPI = (endpoint, method) => async (data) => {
  const token = localStorage.getItem("token");
  let response;

  switch (method?.toUpperCase()) {
    case "POST":
      response = await axiosInstance.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;

    case "PATCH":
      response = await axiosInstance.patch(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;

    case "DELETE":
      response = await axiosInstance.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });
      return response.data;

    default:
      // GET request
      response = await axiosInstance.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
  }
};

export const yearLevelText = (year) => {
  switch (Number(year)) {
    case 1:
      return "1st Year";
    case 2:
      return "2nd Year";
    case 3:
      return "3rd Year";
    case 4:
      return "4th Year";
    default:
      return "Unknown";
  }
};
