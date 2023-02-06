<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "20px",
  },
  fillColor: {
    type: String,
    default: "currentColor",
  },
  strokeColor: {
    type: String,
    default: "currentColor",
  },
});
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 53.867 53.867"
    xml:space="preserve"
  >
    <polygon
      :fill="fillColor"
      :stroke="strokeColor"
      stroke-width="3"
      stroke-linecap="round"
      points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
	10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "
    />
  </svg>
</template>
