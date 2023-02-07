<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

// components
import AppInput from "../components/ui/AppInput.vue";
import AppButton from "../components/ui/AppButton.vue";
import AppSectionTitleVue from "../components/ui/AppSectionTitle.vue";

const { user, updateProfile } = useAuthStore();

// form initial state
const form = reactive({
  email: user.value.Email,
  username: user.value.UserName,
});

// form feedback state
const isLoading = ref(false);
const error = ref(null);

// form submit handler
const handleSubmit = async () => {
  error.value = null;
  isLoading.value = true;
  const [profileUpdateError] = await updateProfile({
    email: form.email,
    username: form.username,
  });
  if (profileUpdateError) error.value = profileUpdateError;
  isLoading.value = false;
};
</script>

<template>
  <main>
    <AppSectionTitleVue title="My Account" class="mb-10"></AppSectionTitleVue>
    <form class="max-w-sm" @submit.prevent="handleSubmit">
      <AppInput v-model="form.email" type="email" label="Email"></AppInput>
      <AppInput v-model="form.username" type="text" label="Username"></AppInput>

      <AppButton
        :disabled="isLoading"
        active
        class="rounded-md"
        label="Save"
        @click="handleSubmit"
      ></AppButton>
    </form>
    <div
      v-if="error"
      class="p-3 mt-4 text-sm text-red-800 rounded-lg bg-red-100"
      role="alert"
    >
      <span class="font-medium">Something went wrong. </span>
      {{ error.message }}
    </div>
  </main>
</template>

<style lang="scss" scoped>
form {
  > *:not(:last-child) {
    @apply mb-4;
  }
}
</style>
