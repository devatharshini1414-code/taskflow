import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProjects } from "../api/project";
import { getTasks } from "../api/task";

function Profile() {
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
  });

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(currentUser);

    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const projectRes = await getProjects();

      const projects = projectRes.data;

      let totalTasks = 0;

      for (let p of projects) {
        const taskRes = await getTasks(p._id);
        totalTasks += taskRes.data.length;
      }

      setStats({
        projects: projects.length,
        tasks: totalTasks,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          padding: "30px",
        }}
      >
        <h1>My Profile</h1>

        <div className="card">
          <h3>Name</h3>
          <p>{user?.name}</p>

          <h3>Email</h3>
          <p>{user?.email}</p>

          <h3>Projects Count</h3>
          <p>{stats.projects}</p>

          <h3>Tasks Count</h3>
          <p>{stats.tasks}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;