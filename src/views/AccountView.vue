<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNotify } from "@/utils/useNotify";

// components
import AppInput from "../components/ui/AppInput.vue";
import AppButton from "../components/ui/AppButton.vue";
import AppSectionTitleVue from "../components/ui/AppSectionTitle.vue";
import AppErrorFeedback from "../components/ui/AppErrorFeedback.vue";

const { user, updateProfile } = useAuthStore();
const { notifySuccess } = useNotify();

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
  else notifySuccess("Profile updated.");
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
