import axios from "axios";

const axiosBase = axios.create({
  // baseURL: "http://localhost:5500/api",
  // notice adding /api on deploy path - the same as we did for localhost path
  baseURL: "https://evangadi-forum-api-deploy.onrender.com/api",
});

export default axiosBase
