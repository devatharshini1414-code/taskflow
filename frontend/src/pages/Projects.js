import { useEffect, useState } from "react";
import { createProject, getProjects, deleteProject } from "../api/project";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject(form);
    setForm({ name: "", description: "" });
    fetchProjects();
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    fetchProjects();
  };

  return (
    <div>
      <h1>Projects</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
        />
        <br />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Create Project</button>
      </form>

      <hr />

      {projects.map((project) => (
  <div key={project._id} className="card">
    <h3>{project.name}</h3>
    <p>{project.description}</p>

    <p>
      <strong>ID:</strong> {project._id}
    </p>
    <button
  onClick={() => handleDelete(project._id)}
>
  Delete Project
</button>
  </div>
))}
    </div>
  );
}

export default Projects;