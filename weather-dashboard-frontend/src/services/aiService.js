// src/services/aiService.js

import axiosInstance from "../api/axios";

export const askAI = async (question) => {
  const response = await axiosInstance.post("/ai", { question });
  return response.data.answer;
};