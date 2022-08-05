import { createRouter, createWebHistory } from "@ionic/vue-router";
import Home from "../components/Home.vue";
import ThemeLogbook from "../components/theme-logbook/ThemeLogbook";

const routes = [
  { path: "/", component: Home },
  { path: "/researcher-logbook", component: ThemeLogbook },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
