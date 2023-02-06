<script setup>
import { ref } from "vue";

// components
import IconChevron from "../icons/IconChevron.vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  options: {
    type: Array,
    required: true,
    validator: (val) => {
      return (
        Array.isArray(val) &&
        val.every((opt) => {
          return "display" in opt && "value" in opt;
        })
      );
    },
  },
});

const emit = defineEmits(["selection", "update:modelValue"]);

const areOptionsOpen = ref(false);
</script>

<template>
  <button
    @click="areOptionsOpen = !areOptionsOpen"
    class="relative block p-2 focus:outline-none hover:text-primary"
    :class="{
      'text-primary': areOptionsOpen,
    }"
  >
    <slot>
      <IconChevron></IconChevron>
    </slot>

    <Transition name="dropdown-transition">
      <div
        v-show="areOptionsOpen"
        class="absolute left-0 mt-2 py-2 bg-white rounded-md shadow-xl z-20"
      >
        <a
          v-for="option in props.options"
          :key="option.value"
          class="block text-left px-4 py-2 text-sm whitespace-nowrap text-gray-700 hover:text-primary ml-4"
          :class="{
            'dropdown-option--active': option.value === modelValue,
          }"
          @click="
            emit('selection', option);
            emit('update:modelValue', option.value);
          "
        >
          {{ option.display }}
        </a>
      </div>
    </Transition>
  </button>
</template>

<style scoped lang="scss">
.dropdown-transition-enter-active,
.dropdown-transition-leave-active {
  @apply transition-all duration-100 ease-linear;
}

.dropdown-transition-enter-from,
.dropdown-transition-leave-to {
  @apply opacity-0 -translate-y-3;
}

.dropdown-option--active {
  @apply relative;
  &::before {
    content: "";
    @apply bg-primary h-2 w-2 absolute left-0 rounded-full top-3;
  }
}
</style>
