/**
 * ROUTER CONFIG
 * I like to give the component name to the route name for better assessment.
 *
 * Decided to dynamically import register and not found view as they might not always be accessed.
 * In the future, we could separate all these routes into some modules files by context (i.e., auth, user, repos, ...)
 */
import { createRouter, createWebHistory } from "vue-router";
import DiscoveryView from "@/views/DiscoveryView.vue";
import AccountView from "@/views/AccountView.vue";
import SignInView from "@/views/SignInView.vue";
import checkAuth from "./middlewares/checkAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "DiscoveryView",
      component: DiscoveryView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/account",
      name: "AccountView",
      component: AccountView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signin",
      name: "SignInView",
      component: SignInView,
    },
    {
      path: "/register",
      name: "RegisterView",
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/not-found",
      name: "NotFoundView",
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: {
        name: "NotFoundView",
      },
    },
  ],
});

// apply middlewares
router.beforeEach(checkAuth);

export default router;
