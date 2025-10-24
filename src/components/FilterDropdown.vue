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

const props = defineProps<{ value: string }>();
const emit = defineEmits(["update:value"]);

const selected = ref(props.value);
watch(selected, (val) => emit("update:value", val));
</script>
