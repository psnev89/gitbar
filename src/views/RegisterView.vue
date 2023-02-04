<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { RouterLink, useRouter } from "vue-router";

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
  const [registerError] = await authStore.register({
    email: form.email,
    password: form.password,
  });
  if (registerError) error.value = registerError;
  else push({ name: "HomeView" });
  isLoading.value = false;
};
</script>

<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <h3>Register</h3>

      <div>
        <label>Email:</label><br />
        <input type="email" v-model="form.email" />
      </div>

      <div>
        <label>Password:</label><br />
        <input type="password" v-model="form.password" />
      </div>

      <button :disabled="isLoading">Register</button>
      <div v-if="error">{{ error.message }}</div>
    </form>
    <div>
      <span> Already have an account? </span>
      <RouterLink :to="{ name: 'SignInView' }">
        Click here to sign in.
      </RouterLink>
    </div>
  </main>
</template>
