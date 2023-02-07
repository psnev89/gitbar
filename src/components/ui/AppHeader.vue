<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/useAuthStore";

// components
import IconAccount from "../icons/IconAccount.vue";

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
        <RouterLink class="mr-auto nav-link" to="/" active-class="active-link">
          Discovery
        </RouterLink>
        <template v-if="isLoggedIn">
          <RouterLink
            class="nav-link"
            :to="{ name: 'AccountView' }"
            active-class="active-link"
          >
            <IconAccount class="inline-block mr-2"></IconAccount>
            <span class="capitalize">Cheers, {{ user.DisplayName }}</span>
          </RouterLink>
          <a class="logout-button" @click="handleLogout">Logout</a>
        </template>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  @apply bg-gray-700 fixed z-20 top-0 left-0 right-0 border-b border-gray-200 h-16;

  h1.logo {
    @apply font-extrabold text-4xl text-primary;
  }

  nav {
    @apply text-white;
  }

  .active-link {
    @apply relative pointer-events-none;
    &::after {
      content: "";
      @apply border-b-4 border-primary left-0 right-0 -bottom-1 h-4 absolute;
    }
  }

  .nav-link {
    @apply hover:text-primary transition-colors duration-75;
  }
  .logout-button {
    @apply ml-8 cursor-pointer hover:text-primary transition-colors duration-75;
  }
}
</style>
