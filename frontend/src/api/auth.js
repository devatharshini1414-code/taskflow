import axios from "axios";

const API = "https://taskflow-backend-we2g.onrender.com/api/users";
// REGISTER
export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};

// LOGIN
export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};