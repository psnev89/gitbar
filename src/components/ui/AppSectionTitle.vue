<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h2 class="section-title">{{ props.title }}</h2>
</template>
