import { createStore } from "vuex";
import { getTodods, createTodo, updateTodo, deleteTodo } from "@/services/api";

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
      // keep newest first like original behaviour
      state.todos.unshift(todo);
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter((t) => t.id !== id);
    },
    updateTodo(state, updated) {
      const idx = state.todos.findIndex((t) => t.id === updated.id);
      if (idx !== -1)
        state.todos.splice(idx, 1, { ...state.todos[idx], ...updated });
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
        return data;
      } catch (err) {
        commit("setError", err.message || "Failed to load todos");
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },

    async createTodo({ commit }, payload) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const created = await createTodo(payload);
        commit("addTodo", created);
        return created;
      } catch (err) {
        commit("setError", err.message || "Failed to create todo");
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },

    async updateTodo({ commit }, { id, payload }) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const updated = await updateTodo(id, payload);
        commit("updateTodo", updated);
        return updated;
      } catch (err) {
        commit("setError", err.message || "Failed to update todo");
        throw err;
      } finally {
        commit("setLoading", false);
      }
    },

    async deleteTodo({ commit }, id) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        await deleteTodo(id);
        commit("deleteTodo", id);
        return true;
      } catch (err) {
        commit("setError", err.message || "Failed to delete todo");
        throw err;
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
