import axios from "axios";

const API = "http://localhost:5000/api/tasks";

const getToken = () => localStorage.getItem("token");

// CREATE TASK
export const createTask = (data) => {
  return axios.post(API, data, {
    headers: { Authorization: getToken() },
  });
};

// GET TASKS
export const getTasks = (projectId) => {
  return axios.get(`${API}/${projectId}`, {
    headers: { Authorization: getToken() },
  });
};

// UPDATE STATUS
export const updateTaskStatus = (id, status) => {
  return axios.put(
    `${API}/${id}`,
    { status },
    {
      headers: { Authorization: getToken() },
    }
  );
};

// DELETE TASK
export const deleteTask = (id) => {
  return axios.delete(`${API}/${id}`, {
    headers: { Authorization: getToken() },
  });
};