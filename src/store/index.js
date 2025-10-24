import { createStore } from "vuex";
import { getTodods } from "@/services/api";

export default createStore({
  state: {
    todos: [],
    loading: false,
    error: null,
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setError(state, value) {
      state.error = value;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    toggleTodo(state, id) {
      const todo = state.todos.find((t) => t.id === id);
      if (todo) todo.completed = !todo.completed;
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const data = await getTodods();
        commit("setTodos", data);
      } catch (err) {
        commit("setError", err.message || "Failed to load todos");
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    completedTodos: (state) => state.todos.filter((t) => t.completed),
    pendingTodos: (state) => state.todos.filter((t) => !t.completed),
  },
});
