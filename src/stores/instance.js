import axios from "axios";

const instance = axios.create({
  // baseURL: "http://192.168.43.21:8080",
  // baseURL: "http://localhost:8080",
  // baseURL: "http://192.168.8.107:8080",
  baseURL:
    "http://ec2-54-254-207-123.ap-southeast-1.compute.amazonaws.com:8080/",
});

export default instance;
