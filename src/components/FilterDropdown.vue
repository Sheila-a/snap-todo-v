<template>
  <Select v-model="selected">
    <SelectTrigger class="w-[300px] bg-white p-6">
      <SelectValue placeholder="Filter by status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="complete">Complete</SelectItem>
      <SelectItem value="incomplete">Incomplete</SelectItem>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ref, watch } from "vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);

const selected = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => (selected.value = val)
);

// Emit on change
watch(selected, (val) => emit("update:modelValue", val));
</script>
