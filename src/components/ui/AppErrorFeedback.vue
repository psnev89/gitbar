<script setup>
const props = defineProps({
  message: {
    type: String,
    default: "An error occured",
  },
});
</script>

<template>
  <div class="p-3 notification-error" role="alert">
    <span class="font-medium">Something went wrong. </span>
    {{ props.message }}
  </div>
</template>
