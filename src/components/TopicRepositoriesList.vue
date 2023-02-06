<script setup>
import { readonly, reactive, watchEffect } from "vue";
import { useRepositoriesStore } from "@/stores/useRepositoriesStore";
import { useTopicsStore } from "@/stores/useTopicsStore";
import sortByOptions from "@/config/reposSortOptions.json";

// components
import AppDropdown from "@/components/ui/AppDropdown.vue";
import RepositoryItem from "./RepositoryItem.vue";
import AppSectionTitle from "./ui/AppSectionTitle.vue";
import IconChevron from "./icons/IconChevron.vue";

const props = defineProps({
  topic: {
    type: String,
    required: true,
  },
});

const topicsStore = useTopicsStore();
const { repositories, getRepositoriesOfQuery } = useRepositoriesStore();

const ctxTopic = readonly(topicsStore.getByKey(props.topic));

const searchQuery = reactive({
  topic: ctxTopic.value,
  perPage: 4,
  page: 1,
  sort: "stars",
});

watchEffect(async () => {
  const [error] = await getRepositoriesOfQuery(searchQuery);
  if (error) console.warn("Error fetching repositories");
});
</script>

<template>
  <div class="topic-container">
    <div class="flex mb-4">
      <AppSectionTitle :title="`Top ${ctxTopic.displayName}`">
      </AppSectionTitle>

      <AppDropdown
        v-model="searchQuery.sort"
        :options="sortByOptions"
      ></AppDropdown>
    </div>

    <div>
      <a role="button" class="pagination-link" @click="searchQuery.page++">
        <IconChevron
          size="40px"
          class="-rotate-90 absolute right-0 top-[50%] pagination-icon"
        ></IconChevron>
      </a>
      <div class="repo-slider">
        <RepositoryItem
          v-for="repo in repositories"
          :key="repo.Id"
          :repository="repo"
        ></RepositoryItem>
      </div>
      <a role="button" class="pagination-link" @click="searchQuery.page++">
        <IconChevron
          size="40px"
          class="-rotate-90 pagination-icon"
        ></IconChevron>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.topic-container {
  @apply -mx-10 px-10 relative;

  .pagination-link {
    @apply opacity-0 absolute right-0 top-[50%];
  }

  &:hover {
    .pagination-link {
      @apply opacity-100;
    }
  }
}

.pagination-icon {
  @apply hover:text-primary;
}

.repo-slider {
  @apply grid gap-1 relative;
  z-index: 2;
  grid-template-columns: repeat(
    v-bind("searchQuery.perPage"),
    minmax(100px, 1fr)
  );
}
</style>
