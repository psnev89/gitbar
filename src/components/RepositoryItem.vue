<script setup>
import { ref, computed } from "vue";
import Repository from "@/models/Repository";
import { useHelpers } from "@/utils/useHelpers";

// components
import IconStar from "@/components/icons/IconStar.vue";

const props = defineProps({
  repository: {
    type: Repository,
    required: true,
  },
});

const emit = defineEmits(["bookmark"]);

const { createHash } = useHelpers();
const srcHash = createHash();

const imgLoaded = ref(false);
const starIconOpts = computed(() => ({
  strokeColor: props.repository.IsBookmarked ? "#F7BE38" : "gray",
  fillColor: props.repository.IsBookmarked ? "#F7BE38" : "white",
}));
</script>

<template>
  <a
    :href="props.repository.Hyperlink"
    target="_blank"
    class="repo-img-link"
    :class="{ '--loading': !imgLoaded }"
    :title="props.repository.FullName"
  >
    <a
      class="bookmark"
      @click.prevent.stop="emit('bookmark', props.repository)"
    >
      <IconStar
        size="24px"
        :stroke-color="starIconOpts.strokeColor"
        :fill-color="starIconOpts.fillColor"
      ></IconStar>
    </a>
    <span class="absolute text-sm text-gray-400 bottom-4 right-4">
      {{ props.repository.FullName }}
    </span>
    <img
      :src="`https://opengraph.githubassets.com/${srcHash}/${props.repository.FullName}`"
      :alt="`Image for ${props.repository.FullName} repository`"
      :class="{ '--loaded': imgLoaded }"
      @load="imgLoaded = true"
    />
  </a>
</template>

<style scoped lang="scss">
a.repo-img-link {
  @apply border-gray-300 border rounded-md overflow-hidden relative h-0 pt-[50%] bg-gray-200;
  z-index: 1;
  transition: transform 0.3s;
  box-sizing: content-box;

  &.--loading {
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
      );
      animation: wave 2s infinite;
      content: "";
    }

    @keyframes wave {
      100% {
        transform: translateX(100%);
      }
    }
  }

  a.bookmark {
    @apply absolute top-2 right-2 z-10 opacity-0 transition-opacity duration-75;
  }

  &:hover {
    transition: transform 0.3s;
    z-index: 500;
    transform: scale(1.4);

    &:last-child {
      transform: scale(1.4) translateX(-14%);
    }

    &:first-child {
      transform: scale(1.4) translateX(14%);
    }

    a.bookmark {
      @apply opacity-100;
    }
  }

  img {
    @apply absolute left-0 top-0 w-full;

    &.--loaded {
      @apply opacity-100;
    }

    &:not(.--loaded) {
      @apply opacity-0;
    }
  }
}
</style>
