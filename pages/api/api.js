import axios from "axios";

const api = axios.create({
  baseURL: "https://api-biblioteca-ird.herokuapp.com",
});

export default api;
