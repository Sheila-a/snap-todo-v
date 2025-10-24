<template>
  <div v-if="hasError" class="text-center mt-20">
    <h1 class="text-2xl font-bold text-red-600">Something went wrong.</h1>
    <p>Please try again later.</p>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";

const hasError = ref(false);

onErrorCaptured((error, instance, info) => {
  console.error("Error caught:", error, info);
  hasError.value = true;
  return false;
});
</script>
