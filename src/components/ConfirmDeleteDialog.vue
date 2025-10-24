<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button
        variant="ghost"
        size="sm"
        class="text-red-500 rounded-full p-4 px-2 bg-[#0718472d]"
      >
        <Trash2Icon />
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete this todo?</AlertDialogTitle>
        <AlertDialogDescription
          >This action is permanent.</AlertDialogDescription
        >
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="onDelete" :disabled="deleting">
          {{ deleting ? "Deleting..." : "Delete" }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue-sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-vue-next";

const props = defineProps<{ todoId: number }>();
const store = useStore();
const deleting = ref(false);

async function onDelete() {
  deleting.value = true;
  const toastId = toast.loading("Deleting Todo...");
  try {
    await store.dispatch("deleteTodo", props.todoId);
    toast.dismiss(toastId);
    toast.success("Todo Deleted");
  } catch (err: any) {
    toast.dismiss(toastId);
    toast.error(err?.message || "Failed to delete");
  } finally {
    deleting.value = false;
  }
}
</script>
