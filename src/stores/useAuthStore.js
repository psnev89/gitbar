import {
  createUser,
  signUserIn,
  signUserOut,
  updateUserProfile,
} from "@/services/auth";
import { computed, reactive } from "vue";
import User from "@/models/User";

// shared state
const userData = reactive({});

export const useAuthStore = () => {
  // getters
  const user = computed(
    () => new User(userData.uid, userData.email, userData.displayName)
  );
  const isLoggedIn = computed(() => !!userData.uid);

  // actions
  // set user
  const setUser = (user) => {
    Object.assign(userData, { ...user });
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

  // user profile update
  const updateProfile = async ({ username, email }) => {
    let error, data;
    await updateUserProfile({ username, email })
      .then((res) => {
        userData.displayName = username;
        userData.email = email;
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
