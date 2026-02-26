import axios from "axios";

const API = "http://localhost:5000/api/cities";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getCities = async () => {
  const res = await axios.get(API, getAuthConfig());
  return res.data;
};

export const addCity = async (name) => {
  const res = await axios.post(API, { name }, getAuthConfig());
  return res.data;
};

export const toggleFavorite = async (id) => {
  const token = localStorage.getItem("token"); // or wherever you store JWT
  const res = await axios.patch(
    `${API}/${id}/favorite`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};