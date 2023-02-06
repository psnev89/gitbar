<script setup>
import { RouterView } from "vue-router";

// components
import AppHeader from "./components/ui/AppHeader.vue";
</script>

<template>
  <AppHeader></AppHeader>
  <RouterView class="mt-16 container mx-auto p-10" />
</template>
