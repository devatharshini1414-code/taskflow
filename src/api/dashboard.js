import axios from "axios";

const PROJECT_API = "http://localhost:5000/api/projects";
const TASK_API = "http://localhost:5000/api/tasks";

const getToken = () => localStorage.getItem("token");

// Get projects
export const getProjects = () => {
  return axios.get(PROJECT_API, {
    headers: { Authorization: getToken() },
  });
};

// Get tasks by project
export const getTasksByProject = (projectId) => {
  return axios.get(`${TASK_API}/${projectId}`, {
    headers: { Authorization: getToken() },
  });
};