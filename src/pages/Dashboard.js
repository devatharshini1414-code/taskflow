import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProjects } from "../api/project";
import { getTasksByProject } from "../api/dashboard";
import "../App.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Get all projects
      const projRes = await getProjects();
      const projectsData = projRes.data;
      setProjects(projectsData);

      let totalTasks = 0;
      let completed = 0;

      // 2. Loop through projects and get tasks
      for (let p of projectsData) {
        const taskRes = await getTasksByProject(p._id);
        const tasks = taskRes.data;

        totalTasks += tasks.length;
        completed += tasks.filter((t) => t.status === "done").length;
      }

      setStats({
        totalTasks,
        completed,
        pending: totalTasks - completed,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Dashboard Analytics</h2>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <div className="card" style={{ width: "200px" }}>
            <h3>Total Projects</h3>
            <h2>{projects.length}</h2>
          </div>

          <div className="card" style={{ width: "200px" }}>
            <h3>Total Tasks</h3>
            <h2>{stats.totalTasks}</h2>
          </div>

          <div className="card" style={{ width: "200px" }}>
            <h3>Completed</h3>
            <h2>{stats.completed}</h2>
          </div>

          <div className="card" style={{ width: "200px" }}>
            <h3>Pending</h3>
            <h2>{stats.pending}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;