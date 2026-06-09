import axios from "axios";

const PROJECT_API =
  "https://taskflow-backend-we2g.onrender.com/api/projects";

const TASK_API =
  "https://taskflow-backend-we2g.onrender.com/api/tasks";

const getToken = () =>
  `Bearer ${localStorage.getItem("token")}`;

// Get projects
export const getProjects = () => {
  return axios.get(PROJECT_API, {
    headers: {
      Authorization: getToken(),
    },
  });
};

// Get tasks by project
export const getTasksByProject = (projectId) => {
  return axios.get(`${TASK_API}/${projectId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};