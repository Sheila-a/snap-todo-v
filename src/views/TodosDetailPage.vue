<template>
  <div class="min-h-screen pt-28 container mx-auto">
    <button
      class="mb-4 bg-white flex items-center px-4 py-2 rounded-md text-[#071847]"
      @click="router.back()"
    >
      ← Back
    </button>

    <div v-if="isLoading" class="text-center mt-10">Loading todo...</div>
    <div v-else-if="isError || !todo" class="text-center text-red-500">
      Error loading todo.
    </div>
    <div v-else class="p-6 bg-white rounded-xl shadow mt-8">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Todo Details</h1>
      </div>

      <p class="text-lg mb-2"><strong>ID:</strong> {{ todo.id }}</p>
      <p class="text-lg mb-2"><strong>Title:</strong> {{ todo.title }}</p>

      <div class="flex items-center gap-2">
        <strong>Status:</strong>
        <span v-if="todo.completed" class="text-green-600">✅ Completed</span>
        <span v-else class="text-gray-600">🕓 Incomplete</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getTodoById } from "@/services/api";
// import { getTodoById } from "@/services/api";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const {
  data: todo,
  isLoading,
  isError,
} = useQuery({
  queryKey: ["todo", id],
  queryFn: () => getTodoById(id),
});
</script>
