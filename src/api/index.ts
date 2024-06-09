import axios from "axios";

const token = localStorage.getItem("token");

export const $withToken = axios.create({
  baseURL: "https://dyplom-backend-mmcb.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    Authorization: token !== null ? `Bearer ${token}` : null,
  },
});

export const $withoutToken = axios.create({
  baseURL: "https://dyplom-backend-mmcb.onrender.com/api/v1",
});
