<script setup>
import { useBookmarksStore } from "@/stores/useBookmarksStore";

// components
import AppSectionTitle from "@/components/ui/AppSectionTitle.vue";
import RepositoryList from "@/components/RepositoryList.vue";

const bookmarksPerPage = 6;
const {
  allBookmarkedRepositories,
  paginatedBookmarkedRepositories,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  previousPage,
  removeBookmarkOfId,
} = useBookmarksStore({ perPage: bookmarksPerPage });
</script>

<template>
  <section>
    <AppSectionTitle title="My Bookmarks" class="mb-4"></AppSectionTitle>

    <RepositoryList
      v-if="allBookmarkedRepositories.length"
      :repositories="paginatedBookmarkedRepositories"
      :per-page="bookmarksPerPage"
      :has-next-page="hasNextPage"
      :has-previous-page="hasPreviousPage"
      @previous-page="previousPage"
      @next-page="nextPage"
      @repo-bookmark="removeBookmarkOfId($event.Id)"
    ></RepositoryList>
  </section>
</template>
