<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <form @submit.prevent="onSubmit">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
        </DialogHeader>

        <Input v-model="title" placeholder="Todo title" class="my-4" required />

        <DialogFooter>
          <Button type="submit" :disabled="submitting">
            {{ submitting ? "Creating..." : "Create" }}
          </Button>

          <DialogClose as-child>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { toast } from "vue-sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { capitalizeFirstWord } from "@/utils/capitalize";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits(["update:open"]);

const open = ref(props.open);
watch(
  () => props.open,
  (v) => (open.value = v)
);
watch(open, (v) => emit("update:open", v));

const title = ref("");
const store = useStore();
const submitting = ref(false);

async function onSubmit() {
  if (!title.value.trim()) return toast.error("Title is required");
  submitting.value = true;
  const payload = {
    title: capitalizeFirstWord(title.value.trim()),
    completed: false,
    userId: 1,
  };
  const toastId = toast.loading("Creating Todo...");
  try {
    await store.dispatch("createTodo", payload);
    toast.dismiss(toastId);
    toast.success("Todo created");
    title.value = "";
    open.value = false;
  } catch (err: any) {
    toast.dismiss(toastId);
    toast.error(err?.message || "Failed to create todo");
  } finally {
    submitting.value = false;
  }
}
</script>
