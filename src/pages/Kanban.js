import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProjects } from "../api/project";
import { getTasksByProject, updateTaskStatus } from "../api/task";
import "../App.css";

function Kanban() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  const loadTasks = async (projectId) => {
    setSelectedProject(projectId);
    const res = await getTasksByProject(projectId);
    setTasks(res.data);
  };

  const moveTask = async (id, status) => {
    await updateTaskStatus(id, status);
    loadTasks(selectedProject);
  };

  const filterTasks = (status) => {
    return tasks.filter((t) => t.status === status);
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Kanban Board</h2>

        {/* Project Selector */}
        <div style={{ marginBottom: "20px" }}>
          <select
            onChange={(e) => loadTasks(e.target.value)}
            style={{ padding: "10px" }}
          >
            <option>Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Board */}
        <div style={{ display: "flex", gap: "15px" }}>
          
          {/* TODO */}
          <div className="card" style={{ width: "30%" }}>
            <h3>🟡 To Do</h3>
            {filterTasks("todo").map((t) => (
              <div key={t._id} className="card">
                <p>{t.title}</p>
                <button onClick={() => moveTask(t._id, "inprogress")}>
                  Move → In Progress
                </button>
              </div>
            ))}
          </div>

          {/* IN PROGRESS */}
          <div className="card" style={{ width: "30%" }}>
            <h3>🔵 In Progress</h3>
            {filterTasks("inprogress").map((t) => (
              <div key={t._id} className="card">
                <p>{t.title}</p>
                <button onClick={() => moveTask(t._id, "done")}>
                  Move → Done
                </button>
              </div>
            ))}
          </div>

          {/* DONE */}
          <div className="card" style={{ width: "30%" }}>
            <h3>🟢 Done</h3>
            {filterTasks("done").map((t) => (
              <div key={t._id} className="card">
                <p>{t.title}</p>
                <button onClick={() => moveTask(t._id, "inprogress")}>
                  Move Back
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kanban;