import axios from "axios";

const API = "http://localhost:5000/api/users";

// REGISTER
export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};

// LOGIN
export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};