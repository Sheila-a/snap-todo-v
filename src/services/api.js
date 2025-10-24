import axios from "axios";

const BASE_URL = import.meta.env.VUE_APP_BASE_URL;

const axiosConfig = () => ({
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(`Request failed with status ${response.status}`);
};

// ✅ GET all todos
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ GET all todos
export const getTodods = async () => {
  const response = await axiosInstance.get("/todos");
  return response.data;
};
// export const getTodods = async () => {
//   const url = `${BASE_URL}/todos`;

//   try {
//     const response = await axios.get(url, axiosConfig());
//     return handleResponse(response);
//   } catch (error) {
//     // if (error?.code === "ERR_NETWORK") {
//     //   const cached = queryClient.getQueryData<Todo[]>(["todos"]);
//     //   if (cached) {
//     //     return cached;
//     //   } else {
//     //     return getTodods();
//     //   }
//     // }
//     console.error("Error fetching todos:", error);
//     throw error;
//   }
// };

// ✅ GET todo by ID
export const getTodoById = async (id) => {
  // const cached = queryClient.getQueryData<Todo[]>(["todos"]);

  try {
    if (id > 200) {
      // if (cached && Array.isArray(cached)) {
      //   const matched = cached.find((todo) => todo.id === id);
      //   if (matched) return matched;
      // } else {
      //   return getTodoById(id);
      // }
    } else {
      const url = `${BASE_URL}/todos/${id}`;
      const response = (await axios.get) < Todo > (url, axiosConfig());
      return handleResponse(response);
    }
  } catch (error) {
    if (error?.code === "ERR_NETWORK") {
      // if (cached && Array.isArray(cached)) {
      //   const matched = cached.find((todo) => todo.id === id);
      //   if (matched) return matched;
      // } else {
      //   return getTodoById(id);
      // }
    }
    console.error("Error fetching todo:", error);
    throw error;
  }
};

// ✅ CREATE todo
export const createTodo = async (param) => {
  try {
    const url = `${BASE_URL}/todos`;
    const response = (await axios.post) < Todo > (url, param, axiosConfig());
    return handleResponse(response);
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// ✅ UPDATE todo
export const updateTodo = async (id, param) => {
  try {
    const url = `${BASE_URL}/todos/${id}`;
    const response = (await axios.put) < Todo > (url, param, axiosConfig());
    return handleResponse(response);
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// ✅ DELETE todo
export const deleteTodo = async (id) => {
  try {
    const url = `${BASE_URL}/todos/${id}`;
    const response = await axios.delete(url, axiosConfig());
    handleResponse(response);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
