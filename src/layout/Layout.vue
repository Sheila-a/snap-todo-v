<template>
  <div>
    <Navbar :value="value" @change="onChange" />
    <div class="bg-[#071847] mbg-[#030B1A] pb-14">
      <slot />
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";

// Props
defineProps({
  value: {
    type: String,
    default: "",
  },
  onChange: {
    type: Function,
    required: true,
  },
});
</script>
