<script setup>
// components
import IconChevron from "./icons/IconChevron.vue";
import RepositoryItem from "./RepositoryItem.vue";

const props = defineProps({
  repositories: {
    type: Array,
    required: true,
  },
  perPage: {
    type: Number,
    default: 4,
  },
  hasNextPage: {
    type: Boolean,
    required: true,
  },
  hasPreviousPage: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["next-page", "previous-page", "repo-bookmark"]);
</script>
<template>
  <div class="repo-list">
    <a
      v-if="props.hasPreviousPage"
      role="button"
      class="pagination-link --previous"
      @click="emit('previous-page')"
    >
      <IconChevron size="40px" class="rotate-90 pagination-icon"></IconChevron>
    </a>
    <div class="repo-slider">
      <RepositoryItem
        v-for="repo in repositories"
        :key="repo.Id"
        :repository="repo"
        @bookmark="emit('repo-bookmark', repo)"
      ></RepositoryItem>
    </div>
    <a
      v-if="props.hasNextPage"
      role="button"
      class="pagination-link --next"
      @click="emit('next-page')"
    >
      <IconChevron size="40px" class="-rotate-90 pagination-icon"></IconChevron>
    </a>
  </div>
</template>

<style scoped lang="scss">
.repo-list {
  @apply relative -mx-10 px-10;

  .pagination-link {
    @apply opacity-0 absolute top-[50%] -translate-y-[50%];

    &.--previous {
      @apply left-0;
    }
    &.--next {
      @apply right-0;
    }
  }

  &:hover {
    .pagination-link {
      @apply opacity-100;
    }
  }

  .pagination-icon {
    @apply hover:text-primary;
  }

  .repo-slider {
    @apply grid gap-1 relative;
    z-index: 2;
    grid-template-columns: repeat(v-bind("props.perPage"), minmax(100px, 1fr));
  }
}
</style>
