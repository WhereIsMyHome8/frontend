import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost/",
    // baseURL: "http://70.12.50.175:82",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { apiInstance };
