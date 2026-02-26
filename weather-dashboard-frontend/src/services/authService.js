import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // adjust if different

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};