<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/useAuthStore";

const { push } = useRouter();
const { isLoggedIn, user, signOut } = useAuthStore();

const handleLogout = async () => {
  const [error] = await signOut();
  if (!error) push({ name: "SignInView" });
};
</script>

<template>
  <header>
    <div class="container mx-auto flex items-center h-full px-10">
      <h1 class="logo">GitBar</h1>
      <nav class="flex-1 flex ml-6">
        <RouterLink class="mr-auto" to="/" active-class="active-link">
          Discovery
        </RouterLink>
        <template v-if="isLoggedIn">
          <span>{{ user.email }}</span>
          <a class="logout-button" @click="handleLogout">Logout</a>
        </template>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  @apply bg-gray-100 fixed z-20 top-0 left-0 right-0 border-b border-gray-200 h-16;

  h1 {
    @apply font-extrabold text-2xl bg-clip-text bg-gradient-to-t from-black/10 to-yellow-400;
    -webkit-text-fill-color: transparent;
  }

  .active-link {
    @apply relative pointer-events-none;
    &::after {
      content: "";
      @apply border-b-4 border-primary left-0 right-0 -bottom-1 h-4 absolute;
    }
  }

  .logout-button {
    @apply ml-8 cursor-pointer hover:text-primary transition-colors duration-75;
  }
}
</style>
