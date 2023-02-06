<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: false,
  },
  pill: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    type="button"
    :class="{
      '--active': props.active,
      '--pill': props.pill,
    }"
    @click="emit('click')"
  >
    {{ props.label }}
  </button>
</template>

<style lang="scss" scoped>
button {
  @apply py-2 px-10 text-sm font-medium text-gray-900 bg-white border border-gray-200 transition-colors duration-100;

  &.--pill {
    @apply rounded-full;
  }

  &:not(.--active) {
    @apply hover:bg-primary/20;
  }

  &.--active {
    @apply bg-primary hover:bg-primary/90;
  }
}
</style>
