import { createUser, signUserIn, signUserOut } from "@/services/auth";
import { computed, ref } from "vue";

// shared state
const userData = ref(null);

export const useAuthStore = () => {
  // getters
  const user = computed(() => userData.value);
  const isLoggedIn = computed(() => !!userData.value);

  // actions
  // set user
  const setUser = (user) => {
    console.log("setting", userData);
    userData.value = user;
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
};
