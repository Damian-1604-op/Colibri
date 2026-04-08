import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//Usuario routes
export const getUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const Login = (data) => api.post("/login", data);

//Roles routes
export const getRoles = () => api.get("/roles");
export const createRole = (data) => api.post("/roles", data);
export const updateRole = (id, data) => api.put(`/roles/${id}`, data);
export const deleteRole = (id) => api.delete(`/roles/${id}`);

//Address routes
export const getAllAddress = () => api.get("/address");
export const createAddres = (data) => api.post("/address", data);
export const updateAddress = (id, data) => api.put(`/address/${id}`, data);
