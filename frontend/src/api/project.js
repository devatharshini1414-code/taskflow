import axios from "axios";

const API = "https://taskflow-backend-we2g.onrender.com/api/projects";
const getToken = () => `Bearer ${localStorage.getItem("token")}`;

// CREATE
export const createProject = (data) => {
  return axios.post(API, data, {
    headers: {
      Authorization: getToken(),
    },
  });
};

// GET
export const getProjects = () => {
  return axios.get(API, {
    headers: {
      Authorization: getToken(),
    },
  });
};

// DELETE
export const deleteProject = (id) => {
  return axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};