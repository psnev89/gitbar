<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { RouterLink, useRouter } from "vue-router";

// components
import AppInput from "../components/ui/AppInput.vue";
import AppButton from "../components/ui/AppButton.vue";
import AppErrorFeedback from "../components/ui/AppErrorFeedback.vue";

// form initial state
const form = reactive({
  email: "",
  password: "",
});

// form feedback state
const isLoading = ref(false);
const error = ref(null);

const authStore = useAuthStore();
const { push } = useRouter();

// form submit handler
const handleSubmit = async () => {
  error.value = null;
  isLoading.value = true;
  const [registerError] = await authStore.signIn({
    email: form.email,
    password: form.password,
  });
  if (registerError) error.value = registerError;
  else push("/");
  isLoading.value = false;
};
</script>

<template>
  <main class="max-w-sm">
    <form @submit.prevent="handleSubmit">
      <AppInput v-model="form.email" type="email" label="Email"></AppInput>
      <AppInput
        v-model="form.password"
        type="password"
        label="Password"
      ></AppInput>

      <AppButton
        :disabled="isLoading"
        active
        class="block w-full rounded-md"
        label="Sign In"
        @click="handleSubmit"
      ></AppButton>
    </form>
    <div class="mt-6 text-sm text-center text-gray-600">
      <span> Don't have an account? </span>
      <RouterLink
        :to="{ name: 'RegisterView' }"
        class="underline transition-colors duration-75 hover:text-primary"
      >
        Click here to sign up.
      </RouterLink>
    </div>

    <AppErrorFeedback
      v-if="error"
      class="mt-4"
      :message="error.message"
    ></AppErrorFeedback>
  </main>
</template>

<style lang="scss" scoped>
form {
  > *:not(:last-child) {
    @apply mb-4;
  }
}
</style>
