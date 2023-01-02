import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ResourcesView from "@/views/ResourcesView.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/resources/:title",
      name: "resources-detail",
      component: ResourcesView,
    },
    { path: "/:pathMatch(.*)", name: "not-found", component: NotFound },
  ],
});

export default router;
