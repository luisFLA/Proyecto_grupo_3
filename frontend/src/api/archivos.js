import axios from "axios";
import { getAuthHeader } from "./auth";

const API_URL = "http://localhost:4000/api";

export const getArchivos = () =>
  axios.get(`${API_URL}/archivos`, { headers: getAuthHeader() });

export const crearArchivo = (data) =>
  axios.post(`${API_URL}/archivos`, data, { headers: getAuthHeader() });
