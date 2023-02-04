<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "./stores/useAuthStore";

const { push } = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  const [error] = await authStore.signOut();
  if (!error) push({ name: "SignInView" });
};
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Discovery</RouterLink>
      <template v-if="authStore.isLoggedIn">
        <a @click="handleLogout">Logout</a>
        <h2>{{ authStore.user.email }}</h2>
      </template>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
