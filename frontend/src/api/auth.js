import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const register = (data) =>
  axios.post(`${API_URL}/auth/register`, data);

export const login = (data) =>
  axios.post(`${API_URL}/auth/login`, data);

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
