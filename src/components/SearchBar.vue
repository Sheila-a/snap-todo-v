<template>
  <Input
    type="text"
    placeholder="Search todos..."
    v-model="val"
    class="w-full md:max-w-lg bg-[#071847] text-white outline-none placeholder:text-white rounded-full p-4 py-6"
    aria-label="Search todos by title"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Input } from "@/components/ui/input";

const props = defineProps<{ value?: string }>();
const emit = defineEmits(["update:value"]);
const val = ref(props.value || "");

watch(val, (v) => emit("update:value", v));
</script>
