import api from "../api/axios";

export const getCities = async () => {
  const response = await api.get("/cities");
  return response.data;
};

export const addCity = async (name) => {
  const response = await api.post("/cities", { name });
  return response.data;
};

export const toggleFavorite = async (id) => {
  const response = await api.patch(`/cities/${id}/favorite`);
  return response.data;
};

export const deleteCity = async (id) => {
  const response = await api.delete(`/cities/${id}`);
  return response.data;
};