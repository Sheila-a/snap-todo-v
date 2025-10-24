<!-- <template>
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
</script> -->
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

// ✅ Fix: use modelValue for compatibility with v-model
const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits(["update:modelValue"]);

const val = ref(props.modelValue || "");

// Keep in sync with parent
watch(
  () => props.modelValue,
  (v) => (val.value = v)
);

// Emit changes
watch(val, (v) => emit("update:modelValue", v));
</script>
