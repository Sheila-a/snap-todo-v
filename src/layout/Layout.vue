<template>
  <div>
    <Navbar v-model="internalValue" />
    <div class="bg-[#071847] mbg-[#030B1A] pb-14">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Navbar from "../components/Navbar.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

// keep synced with parent
watch(
  () => props.modelValue,
  (v) => (internalValue.value = v)
);

// emit updates
watch(internalValue, (v) => emit("update:modelValue", v));
</script>
