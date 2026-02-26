import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/projects";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data.data);
  };

  const handleCreate = async () => {
    await createProject({ title });
    setTitle("");
    fetchProjects();
  };

  return (
    <div>
      <h2>My Projects</h2>

      <input
        type="text"
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>

      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;