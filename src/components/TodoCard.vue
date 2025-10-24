<template>
  <div
    class="flex items-center justify-between p-4 bg-white shadow rounded-xl hover:bg-gray-100 cursor-pointer"
    :class="{ 'bg-white bg-opacity-15': todo.completed }"
    role="button"
    tabindex="0"
    @click="onClick"
    @keydown.enter="onClick"
    :aria-label="`Todo: ${todo.title}`"
  >
    <div class="flex items-center gap-3">
      <component
        :is="todo.completed ? CheckCircle : Circle"
        :class="todo.completed ? 'text-green-500' : 'text-gray-400'"
      />
      <span
        :class="[
          'text-base',
          todo.completed ? 'line-through text-gray-500' : '',
        ]"
      >
        {{ capitalizeFirstWord(todo.title) }}
      </span>
    </div>

    <div class="flex items-center gap-3">
      <EditTodoModal :todo="todo" />
      <ConfirmDeleteDialog :todoId="todo.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle, Circle } from "lucide-vue-next";
import { capitalizeFirstWord } from "@/utils/capitalize";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.vue";
import EditTodoModal from "./EditTodoModal.vue";

const props = defineProps<{ todo: any; onClick: () => void }>();
const { todo, onClick } = props;
</script>
