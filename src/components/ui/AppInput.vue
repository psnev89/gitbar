<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    validator: (val) => {
      const allowed = ["text", "email", "password"];
      return allowed.includes(val);
    },
  },
  modelValue: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label class="block mb-1 text-sm font-medium text-gray-900">
      {{ label }}
    </label>
    <input
      :type="props.type"
      :value="modelValue"
      class="bg- white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary focus:border-primary focus:outline-primary block w-full p-2"
      @input="(event) => emit('update:modelValue', event.target.value)"
    />
  </div>
</template>
