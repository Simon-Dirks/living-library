import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../components/HomePage.vue";
import ThemeLogbook from "../components/theme-logbook/ThemeLogbook";
import SignIn from "@/components/auth/SignIn";

const routes = [
  { path: "/", component: HomePage },
  { path: "/researcher-logbook", component: ThemeLogbook },
  { path: "/signin", component: SignIn },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
