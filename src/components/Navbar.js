import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
        <Link to="/kanban" style={{ margin: "10px", color: "white" }}>
  Kanban
</Link>
      <Link to="/dashboard" style={{ margin: "10px", color: "white" }}>
        Dashboard
      </Link>

      <Link to="/projects" style={{ margin: "10px", color: "white" }}>
        Projects
      </Link>

      <Link to="/tasks" style={{ margin: "10px", color: "white" }}>
        Tasks
      </Link>

      <button onClick={logout} style={{ marginLeft: "20px" }}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;