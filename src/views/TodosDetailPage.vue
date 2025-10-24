<!-- <template>
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
</script> -->

<!-- src/pages/TodoDetailPage.vue -->
<template>
  <Layout>
    <div class="min-h-screen pt-28">
      <Button
        variant="ghost"
        @click="goBack"
        class="mb-4 mx-[7vw] bg-white flex items-center"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </Button>

      <section
        class="w-full mx-auto container p-6 bg-white rounded-xl shadow mt-8"
      >
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold">Todo Details</h1>
          <span class="flex gap-3">
            <EditTodoModal :todo="todo" />
            <ConfirmDeleteDialog :todo-id="todo?.id" />
          </span>
        </div>

        <p class="text-lg mb-2"><strong>ID:</strong> {{ todo?.id }}</p>
        <p class="text-lg mb-2"><strong>Title:</strong> {{ todo?.title }}</p>

        <div class="flex items-center gap-2">
          <strong>Status:</strong>
          <span v-if="todo?.completed" class="text-green-600 flex items-center">
            <CheckCircle class="w-4 h-4 mr-1" /> Completed
          </span>
          <span v-else class="text-gray-600 flex items-center">
            <Circle class="w-4 h-4 mr-1" /> Incomplete
          </span>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTodoById } from "../services/api";
import Layout from "../layout/Layout.vue";
import { Button } from "../components/ui/button";
// import { ConfirmDeleteDialog, EditTodoModal } from "../components";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog.vue";
import EditTodoModal from "@/components/EditTodoModal.vue";
import { ArrowLeft, CheckCircle, Circle } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const todo = ref(null);
const loading = ref(true);
const error = ref(false);

const fetchTodo = async () => {
  try {
    const id = route.params.id;
    const res = await getTodoById(id);
    todo.value = res;
  } catch (err) {
    console.error("Failed to load todo:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchTodo();
});
</script>
