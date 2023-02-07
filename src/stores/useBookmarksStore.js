import Repository from "@/models/Repository";
import { reactive, computed, ref } from "vue";

// "global" state
const bookmarked = reactive([]);

export const useBookmarksStore = (options = {}) => {
  const { perPage = 6, initialPage = 1 } = options;

  const totalPages = computed(() => bookmarked.length / perPage);
  const page = ref(initialPage);

  const allBookmarkedRepositories = computed(() => {
    return bookmarked.map(
      (r) => new Repository(r.id, r.fullName, r.hyperlink, true)
    );
  });

  const paginatedBookmarkedRepositories = computed(() => {
    const fromIndex = perPage * (Number(page.value) - 1);
    const toIndex = perPage * Number(page.value);
    return [...bookmarked]
      .slice(fromIndex, toIndex)
      .map((r) => new Repository(r.id, r.fullName, r.hyperlink, true));
  });

  const bookmarkIndexOfId = (repoId) => {
    return bookmarked.findIndex((r) => r.id === repoId);
  };

  const bookmarkOfIdExists = (repoId) => {
    return bookmarkIndexOfId(repoId) >= 0;
  };

  const nextPage = () => {
    if (page.value < totalPages.value) page.value++;
  };
  const previousPage = () => {
    if (page.value > 1) page.value--;
  };

  const addBookmark = (repo) => {
    if (!repo || bookmarkIndexOfId(repo.id) >= 0) return; // already bookmarked
    bookmarked.push(repo);
  };

  const hasNextPage = computed(() => totalPages.value > page.value);
  const hasPreviousPage = computed(() => page.value > 1);

  const removeBookmarkOfId = (repoId) => {
    const repoIndex = bookmarkIndexOfId(repoId);
    if (repoIndex > -1) bookmarked.splice(repoIndex, 1);
  };

  return {
    allBookmarkedRepositories,
    paginatedBookmarkedRepositories,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    addBookmark,
    removeBookmarkOfId,
    bookmarkOfIdExists,
  };
};
