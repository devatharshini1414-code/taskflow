import axios from "axios";

const API = "https://taskflow-backend-we2g.onrender.com/api/tasks";
const getToken = () => `Bearer ${localStorage.getItem("token")}`;

// CREATE TASK
export const createTask = (data) => {
  return axios.post(API, data, {
    headers: {
      Authorization: getToken(),
    },
  });
};

// GET TASKS
export const getTasks = (projectId) => {
  return axios.get(`${API}/${projectId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};

// UPDATE STATUS
export const updateTaskStatus = (id, status) => {
  return axios.put(
    `${API}/${id}`,
    { status },
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};

// DELETE TASK
export const deleteTask = (id) => {
  return axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};