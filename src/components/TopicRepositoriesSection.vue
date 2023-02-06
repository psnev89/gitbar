<script setup>
import { readonly, reactive, watchEffect } from "vue";
import { useRepositoriesStore } from "@/stores/useRepositoriesStore";
import { useTopicsStore } from "@/stores/useTopicsStore";
import sortByOptions from "@/config/reposSortOptions.json";

// components
import AppDropdown from "@/components/ui/AppDropdown.vue";
import AppSectionTitle from "./ui/AppSectionTitle.vue";
import RepositoryList from "./RepositoryList.vue";

const props = defineProps({
  topic: {
    type: String,
    required: true,
  },
});

const topicsStore = useTopicsStore();
const {
  repositories,
  totalPages,
  getRepositoriesOfQuery,
  bookmarkRepositoryOfId,
  removeRepositoryBookmarkOfId,
  isRepositoryOfIdBookmarked,
} = useRepositoriesStore();

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

const toggleBookmark = ($repo) => {
  if (isRepositoryOfIdBookmarked($repo.Id)) {
    removeRepositoryBookmarkOfId($repo.Id);
  } else {
    bookmarkRepositoryOfId($repo.Id);
  }
};
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

    <RepositoryList
      :repositories="repositories"
      :has-next-page="totalPages > searchQuery.page"
      :has-previous-page="searchQuery.page > 1"
      @previous-page="searchQuery.page--"
      @next-page="searchQuery.page++"
      @repo-bookmark="toggleBookmark"
    ></RepositoryList>
  </div>
</template>

<style scoped lang="scss">
.topic-container {
  @apply -mx-10 px-10 relative;
}
</style>
