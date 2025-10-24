<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button
        variant="ghost"
        size="sm"
        class="rounded-full p-4 px-2 bg-[#0718472d]"
      >
        <EditIcon />
      </Button>
    </DialogTrigger>

    <DialogContent>
      <form @submit.prevent="onSubmit">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>

        <Input v-model="title" class="my-4" required />

        <DialogFooter>
          <Button type="submit" :disabled="saving">
            {{ saving ? "Saving..." : "Save" }}
          </Button>
          <DialogClose as-child>
            <Button type="button" variant="outline">Cancel</Button>
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-vue-next";
import { capitalizeFirstWord } from "@/utils/capitalize";

const props = defineProps<{ todo: any }>();
const open = ref(false);
const title = ref(props.todo?.title || "");
watch(
  () => props.todo,
  (v) => {
    title.value = v?.title || "";
  }
);

const store = useStore();
const saving = ref(false);

async function onSubmit() {
  if (!title.value.trim()) return toast.error("Title is required");
  saving.value = true;
  const payload = {
    title: capitalizeFirstWord(title.value.trim()),
  };

  const toastId = toast.loading("Updating Todo...");
  try {
    // For jsonplaceholder, update endpoint exists; for local longer ids logic can be placed in store if needed
    await store.dispatch("updateTodo", {
      id: props.todo.id,
      payload: { ...props.todo, title: payload.title },
    });
    toast.dismiss(toastId);
    toast.success("Todo updated");
    open.value = false;
  } catch (err: any) {
    toast.dismiss(toastId);
    toast.error(err?.message || "Failed to update");
  } finally {
    saving.value = false;
  }
}
</script>
