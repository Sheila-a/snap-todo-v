<template>
  <header class="top-0 fixed w-full z-50 shadow-lg">
    <nav class="flex bg-white items-center px-[7vw] py-5 justify-between">
      <div class="flex items-center gap-2 w-full">
        <RouterLink to="/">
          <h1 class="text-4xl">SNAP TODO</h1>
        </RouterLink>
      </div>

      <div class="hidden md:flex justify-end w-full">
        <SearchBar v-model="search" />
      </div>

      <button class="lg:hidden" @click="toggleMenu" aria-label="Toggle menu">
        <component :is="isOpen ? XIcon : MenuIcon" :size="24" />
      </button>
    </nav>

    <nav
      class="lg:hidden transition-all px-[7vw] duration-300 bg-white overflow-hidden"
      :class="isOpen ? 'py-4' : 'max-h-0'"
    >
      <div class="md:hidden flex flex-col gap-3 mt-4">
        <div class="flex gap-2 items-center">
          <SearchBar v-model="search" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import SearchBar from "./SearchBar.vue";
import { Menu as MenuIcon, X as XIcon } from "lucide-vue-next";

const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits(["update:modelValue"]);

const search = ref(props.modelValue || "");

// sync with parent prop
watch(
  () => props.modelValue,
  (v) => (search.value = v)
);

// emit when local value changes
watch(search, (v) => emit("update:modelValue", v));

const isOpen = ref(false);
const toggleMenu = () => (isOpen.value = !isOpen.value);
</script>
