import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getTodods = async () => {
  const response = await axiosInstance.get("/todos");
  return response.data;
};

export const getTodoById = async (id) => {
  const response = await axiosInstance.get(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (param) => {
  const response = await axiosInstance.post("/todos", param);
  return response.data;
};

export const updateTodo = async (id, param) => {
  const response = await axiosInstance.put(`/todos/${id}`, param);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data;
};
