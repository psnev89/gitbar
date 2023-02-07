import {
  createUser,
  signUserIn,
  signUserOut,
  updateUserProfile,
} from "@/services/auth";
import { computed, ref, watch } from "vue";
import User from "@/models/User";
import { useLocalStorage } from "../utils/useLocalStorage";

// shared state
const userData = ref(null);

const bookmarksLocalStorage = useLocalStorage("bookmarks");
watch(userData, (newUser, oldUser) => {
  if (newUser?.uid !== oldUser?.uid) bookmarksLocalStorage.remove();
});

export const useAuthStore = () => {
  // getters
  const user = computed(
    () =>
      new User(
        userData.value.uid,
        userData.value.email,
        userData.value.displayName
      )
  );
  const isLoggedIn = computed(() => !!userData?.value?.uid);

  // actions
  // set user
  const setUser = (user) => {
    userData.value = user;
    return userData.value;
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

  // user profile update
  const updateProfile = async ({ username, email }) => {
    let error, data;
    await updateUserProfile({ username, email })
      .then((res) => {
        const u = {
          ...(userData.value ?? {}),
          ...{
            displayName: username,
            email,
          },
        };
        setUser(u);
        data = res;
      })
      .catch((err) => (error = err));
    return [error, data];
  };

  return {
    user,
    isLoggedIn,
    register,
    signIn,
    signOut,
    setUser,
    updateProfile,
  };
};
