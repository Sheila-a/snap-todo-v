import { createRouter, createWebHistory } from "vue-router";
import TodosPage from "@/views/TodosPage.vue";
import TodosDetailPage from "@/views/TodosDetailPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    { path: "/", name: "Home", component: TodosPage },
    {
      path: "/:id",
      name: "TodoDetail",
      component: TodosDetailPage,
      props: true,
    },
  ],
});

export default router;
