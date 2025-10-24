<!-- <template>
  <div class="min-h-screen container mx-auto pt-28">

    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-14 mt-8"
    >
      <span class="flex items-center gap-4">
        <h3 class="text-white text-lg">Filter:</h3>
        <select
          v-model="filterStatus"
          class="rounded-md p-2 border border-gray-200 bg-white"
        >
          <option value="all">All</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </span>

      <span class="flex items-center gap-4">
        <button
          @click="open = true"
          class="p-3 bg-white rounded-full text-[#071847] hover:bg-white/70"
        >
          ➕ New Todo
        </button>
      </span>
    </div>

   
    <div v-if="loading" class="text-center text-white mt-20">
      Loading Todos...
    </div>
    <div v-else-if="error" class="text-center text-red-500 mt-10">
      Failed to load todos.
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="todo in paginatedTodos"
        :key="todo.id"
        class="bg-white p-4 rounded-lg cursor-pointer shadow"
        @click="goToDetail(todo.id)"
      >
        <h2 class="font-semibold text-lg text-white">{{ todo.title }}</h2>
        <p class="text-sm text-gray-600">
          {{ todo.completed ? "✅ Completed" : "🕓 Incomplete" }}
        </p>
      </div>
    </div>

 
    <div class="flex justify-center mt-10 gap-4">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="[
          'px-3 py-2 rounded-md border',
          currentPage === page
            ? 'bg-[#071847] text-white'
            : 'bg-white text-[#071847]',
        ]"
        @click="currentPage = page"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const open = ref(false);
const currentPage = ref(1);
const filterStatus = ref("all");
const searchTerm = ref("");

// Access state from Vuex
const todos = computed(() => store.state.todos);
const loading = computed(() => store.state.loading);
const error = computed(() => store.state.error);
console.log(todos);

// Filtered + Paginated Todos
const filteredTodos = computed(() => {
  let result = todos.value;
  if (searchTerm.value) {
    result = result.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }
  if (filterStatus.value !== "all") {
    const completed = filterStatus.value === "complete";
    result = result.filter((todo) => todo.completed === completed);
  }
  return result;
});

const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * 10;
  return filteredTodos.value.slice(start, start + 10);
});

const totalPages = computed(() => Math.ceil(filteredTodos.value.length / 10));

// Methods
function goToDetail(id: number) {
  router.push(`/${id}`);
}

onMounted(() => {
  store.dispatch("fetchTodos");
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style> -->

<template>
  <Layout :value="searchTerm" :onChange="(val) => (searchTerm = val)">
    <section class="container mx-auto pt-28">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-14 mt-8"
      >
        <span class="flex items-center gap-4">
          <h3 class="text-white text-lg">Filter:</h3>
          <FilterDropdown v-model="filterStatus" />
        </span>

        <span class="flex items-center gap-4">
          <Button
            class="p-6 bg-white rounded-full text-[#071847] hover:bg-white/50"
            @click="open = true"
          >
            <Plus class="w-4 h-4 mr-2" />
            New Todo
          </Button>
          <Button
            class="bg-white rounded-full text-[#071847] hover:bg-white/50 p-6 px-4"
            @click="reloadTodos"
          >
            <RefreshCcw />
          </Button>
        </span>
      </div>

      <!-- Add Todo Modal -->
      <AddTodoModal :open="open" @close="open = false" />

      <!-- Loading State -->
      <div v-if="loading" class="min-h-screen container mx-auto">
        <div class="flex items-center pt-28 justify-between mb-4">
          <h1 class="text-2xl font-bold text-white">My Todos</h1>
        </div>
        <ListLoading :count="4" />
      </div>

      <!-- Error State -->
      <p v-else-if="error" class="text-center mt-10 text-red-500">
        Failed to load todos.
      </p>

      <!-- Todos -->
      <div v-else class="grid gap-4">
        <TodoCard
          v-for="todo in paginatedTodos"
          :key="todo.id"
          :todo="todo"
          @click="goToTodo(todo.id)"
        />
      </div>

      <!-- Pagination -->
      <PaginationControls
        :currentPage="currentPage"
        :totalItems="filteredTodos.length"
        @page-change="setCurrentPage"
      />
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Plus, RefreshCcw } from "lucide-vue-next";

import Layout from "@/layout/Layout.vue";
import FilterDropdown from "@/components/FilterDropdown.vue";
import PaginationControls from "@/components/PaginationControls.vue";
import AddTodoModal from "@/components/AddTodoModal.vue";
import TodoCard from "@/components/TodoCard.vue";
import { Button } from "@/components/ui/button";
import ListLoading from "@/components/skeleton/ListLoading.vue";

const store = useStore();
const router = useRouter();

// Local state
const currentPage = ref(1);
const searchTerm = ref("");
const filterStatus = ref("all");
const open = ref(false);

// Vuex State
const todos = computed(() => store.state.todos);
const loading = computed(() => store.state.loading);
const error = computed(() => store.state.error);

// Fetch todos on mount
onMounted(() => {
  store.dispatch("fetchTodos");
});

function reloadTodos() {
  store.dispatch("fetchTodos");
}

function goToTodo(id: number) {
  router.push(`/todos/${id}`);
}

function setCurrentPage(page: number) {
  currentPage.value = page;
}

// Filtered Todos
const filteredTodos = computed(() => {
  let result = todos.value || [];

  if (searchTerm.value) {
    result = result.filter((todo: any) =>
      todo.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  if (filterStatus.value !== "all") {
    const completed = filterStatus.value === "complete";
    result = result.filter((todo: any) => todo.completed === completed);
  }

  return result;
});

// Paginated Todos
const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * 10;
  return filteredTodos.value.slice(start, start + 10);
});
</script>

<style scoped>
.container {
  max-width: 1000px;
}
</style>
