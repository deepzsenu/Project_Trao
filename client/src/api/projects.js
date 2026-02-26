import API from "./axios";

export const createProject = async (projectData) => {
  const response = await API.post("/projects", projectData);
  return response.data;
};

export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};