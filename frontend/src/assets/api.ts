import axios from "axios";

//axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: "http://localhost:5000/API/",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});
