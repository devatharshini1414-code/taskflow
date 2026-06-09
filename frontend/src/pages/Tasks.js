import { useState, useEffect } from "react";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../api/task";

import { getProjects } from "../api/project";

function Tasks() {
  const [projectId, setProjectId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Medium",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    if (!projectId) {
      alert("Select Project");
      return;
    }

    try {
      const res = await getTasks(projectId);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        ...form,
        projectId,
      });

      setForm({
        title: "",
        description: "",
        deadline: "",
        priority: "Medium",
      });

      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const getDeadlineStatus = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return "🔴 Overdue";
    }

    if (dueDate.getTime() === today.getTime()) {
      return "🟡 Due Today";
    }

    return "🟢 On Track";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tasks</h1>

      {/* Project Selection */}
      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "8px",
        }}
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option
            key={project._id}
            value={project._id}
          >
            {project.name}
          </option>
        ))}
      </select>

      <button onClick={fetchTasks}>
        Load Tasks
      </button>

      <hr />

      {/* Create Task */}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          required
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
        </select>

        <button type="submit">
          Create Task
        </button>
      </form>

      <hr />

      {/* Search */}
      <input
        type="text"
        placeholder="Search Tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          padding: "10px",
          marginRight: "10px",
        }}
      />

      {/* Filter */}
      <button
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        onClick={() => setFilter("todo")}
      >
        To Do
      </button>

      <button
        onClick={() =>
          setFilter("inprogress")
        }
      >
        In Progress
      </button>

      <button
        onClick={() => setFilter("done")}
      >
        Done
      </button>

      <hr />

      {tasks
        .filter((task) =>
          task.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        )
        .filter((task) =>
          filter === "all"
            ? true
            : task.status === filter
        )
        .map((task) => (
          <div
            key={task._id}
            className="card"
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              Status:
              {" "}
              {task.status}
            </p>

            <p>
              Priority:
              {" "}
              {task.priority ||
                "Medium"}
            </p>

            <p>
              Deadline:
              {" "}
              {task.deadline}
            </p>

            <p>
              {getDeadlineStatus(
                task.deadline
              )}
            </p>

            <button
              onClick={() =>
                handleStatus(
                  task._id,
                  "inprogress"
                )
              }
            >
              In Progress
            </button>

            <button
              onClick={() =>
                handleStatus(
                  task._id,
                  "done"
                )
              }
            >
              Done
            </button>

            <button
              onClick={() =>
                handleDelete(task._id)
              }
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default Tasks;