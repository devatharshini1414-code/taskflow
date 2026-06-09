import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProjects } from "../api/project";
import { getTasks } from "../api/task";
import "../App.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
      const projectRes = await getProjects();
      const projectList = projectRes.data;

      setProjects(projectList);

      let totalTasks = 0;
      let completed = 0;
      let pending = 0;

      for (const project of projectList) {
        const taskRes = await getTasks(project._id);
        const tasks = taskRes.data;

        totalTasks += tasks.length;

        completed += tasks.filter(
          (task) => task.status === "done"
        ).length;

        pending += tasks.filter(
          (task) =>
            task.status === "todo" ||
            task.status === "inprogress"
        ).length;
      }

      setStats({
        totalTasks,
        completed,
        pending,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  const chartData = [
    {
      name: "Completed",
      value: stats.completed,
    },
    {
      name: "Pending",
      value: stats.pending,
    },
  ];

return (
  <div>
    <Navbar />

    <div className="dashboard-container">
      <h2 className="dashboard-title">
        Dashboard Analytics
      </h2>

      <div className="dashboard-grid">

        <div className="dashboard-card projects">
          <h3>Total Projects</h3>
          <h1>{projects.length}</h1>
        </div>

        <div className="dashboard-card tasks">
          <h3>Total Tasks</h3>
          <h1>{stats.totalTasks}</h1>
        </div>

        <div className="dashboard-card completed">
          <h3>Completed</h3>
          <h1>{stats.completed}</h1>
        </div>

        <div className="dashboard-card pending">
          <h3>Pending</h3>
          <h1>{stats.pending}</h1>
        </div>

      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={130}
              label
            >
              <Cell fill="#10b981" />
              <Cell fill="#f59e0b" />
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
}

export default Dashboard;