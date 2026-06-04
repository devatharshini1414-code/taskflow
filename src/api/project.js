import axios from "axios";

const API = "http://localhost:5000/api/projects";

const getToken = () => localStorage.getItem("token");

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