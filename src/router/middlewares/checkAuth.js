import { useAuthStore } from "@/stores/useAuthStore";
import { getCurrentUser } from "@/services/auth";

const nonAuthRouteNames = ["SignInView", "RegisterView"];

export default async (to) => {
  const { setUser, isLoggedIn } = useAuthStore();

  // check if user is logged in
  if (!isLoggedIn.value) {
    const user = await getCurrentUser();
    setUser(user?.uid ? user : {});
  }

  // is logged and navigating to sign in/up routes?
  if (isLoggedIn.value && nonAuthRouteNames.includes(to?.name)) {
    return { name: "DiscoveryView" };
  }

  // is not logged and navigating to auth required routes?
  if (to?.meta?.requiresAuth && !isLoggedIn.value) {
    return { name: "SignInView" };
  }
};
