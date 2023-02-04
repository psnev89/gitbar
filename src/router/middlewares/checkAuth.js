import { useAuthStore } from "@/stores/useAuthStore";
import { getCurrentUser } from "@/services/auth";

const nonAuthRouteNames = ["SignInView", "RegisterView"];

export default async (to) => {
  const authStore = useAuthStore();

  // check if user is logged in
  if (!authStore.isLoggedIn) {
    const user = await getCurrentUser();
    authStore.setUser(user?.uid ? user : null);
  }

  // is logged and navigating to sign in/up routes?
  if (authStore.isLoggedIn && nonAuthRouteNames.includes(to?.name)) {
    return { name: "DiscoveryView" };
  }

  // is not logged and navigating to auth required routes?
  if (to?.meta?.requiresAuth && !authStore.isLoggedIn) {
    return { name: "SignInView" };
  }
};
