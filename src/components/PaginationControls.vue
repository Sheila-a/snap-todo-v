<template>
  <div class="flex justify-end mt-10 gap-4">
    <Button
      :disabled="currentPage === 1"
      @click="handlePrevious"
      variant="outline"
    >
      <ChevronLeft />
    </Button>
    <span class="text-sm mt-2 text-white"
      >Page {{ currentPage }} of {{ totalPages }}</span
    >
    <Button
      :disabled="currentPage === totalPages"
      @click="handleNext"
      variant="outline"
    >
      <ChevronRight />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{ currentPage: number; totalItems: number }>();
const emit = defineEmits(["pageChange"]);

const totalPages = computed(() => Math.ceil(props.totalItems / 10));

const handlePrevious = () => {
  if (props.currentPage > 1) emit("pageChange", props.currentPage - 1);
};

const handleNext = () => {
  if (props.currentPage < totalPages.value)
    emit("pageChange", props.currentPage + 1);
};
</script>
