import { createUser, signUserIn, signUserOut } from "@/services/auth";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // state
  const state = reactive({
    user: null,
  });

  // getters
  const user = computed(() => state.user);
  const isLoggedIn = computed(() => !!state.user);

  // actions
  // set user
  const setUser = (user) => {
    state.user = user;
    return user;
  };

  // register user
  const register = async ({ email, password }) => {
    let error, data;
    await createUser({ email, password })
      .then((res) => (data = setUser(res.user)))
      .catch((err) => (error = err));
    return [error, data];
  };

  // user login
  const signIn = async ({ email, password }) => {
    let error, data;
    await signUserIn({ email, password })
      .then((res) => (data = setUser(res.user)))
      .catch((err) => (error = err));
    return [error, data];
  };

  // user logout
  const signOut = async () => {
    let error;
    await signUserOut()
      .then(() => setUser(null))
      .catch((err) => (error = err));
    return [error];
  };

  return { user, isLoggedIn, register, signIn, signOut, setUser };
});
