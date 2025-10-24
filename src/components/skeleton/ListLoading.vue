<!-- src/components/ListLoading.vue -->
<template>
  <div class="divide-y divide-slate-100">
    <div v-for="(item, i) in computedItems" :key="i" class="p-4 w-full mx-auto">
      <div class="animate-pulse flex items-center space-x-4">
        <div class="flex-none flex space-x-2 items-center">
          <div class="rounded h-5 w-5 bg-[#C4C4C4]" />
          <div class="rounded h-5 w-5 bg-[#C4C4C4]" />
          <div class="h-8 w-8 rounded-full bg-[#C4C4C4]" />
        </div>
        <div class="flex-1 bg-[#C4C4C4] h-2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: null,
  },
  count: {
    type: Number,
    default: 6,
  },
});

const computedItems = computed(
  () => props.items || Array.from({ length: props.count })
);
</script>
