import axios from "axios";

const api = axios.create({
  baseURL: "http://api-biblioteca-ird.herokuapp.com",
});

export default api;
