import Repository from "@/models/Repository";
import { getRepositories } from "@/services/repositories";
import { reactive, computed } from "vue";

// "global" state
const bookmarked = reactive([]);

export const useRepositoriesStore = () => {
  // local state
  const state = reactive({
    repositoriesData: [],
    totalNumberOfPages: 1,
  });

  const repositories = computed(() => {
    return state.repositoriesData.map(
      (r) =>
        new Repository(
          r.id,
          r.fullName,
          r.hyperlink,
          isRepositoryOfIdBookmarked(r.id)
        )
    );
  });

  const totalPages = computed(() => state.totalNumberOfPages);

  const bookmarkedRepositories = computed(() => {
    return bookmarked.map(
      (r) => new Repository(r.id, r.fullName, r.hyperlink, true)
    );
  });

  const getRepositoriesOfQuery = async (query) => {
    let error, data;
    await getRepositories(query)
      .then(({ items, meta }) => {
        state.repositoriesData = data = [...items];
        state.totalNumberOfPages = meta.totalPages;
      })
      .catch((err) => (error = err));
    return [error, data];
  };

  const bookmarkIndexOfId = (repoId) => {
    return bookmarked.findIndex((r) => r.id === repoId);
  };

  const isRepositoryOfIdBookmarked = (repoId) => {
    return bookmarkIndexOfId(repoId) >= 0;
  };

  const bookmarkRepositoryOfId = (repoId) => {
    if (bookmarkIndexOfId(repoId) >= 0) return; // already bookmarked
    const repo = state.repositoriesData.find((r) => r.id === repoId);
    if (repo) bookmarked.push(repo);
  };

  const removeRepositoryBookmarkOfId = (repoId) => {
    const repoIndex = bookmarkIndexOfId(repoId);
    if (repoIndex > -1) bookmarked.splice(repoIndex, 1);
  };

  return {
    repositories,
    bookmarkedRepositories,
    totalPages,
    getRepositoriesOfQuery,
    bookmarkRepositoryOfId,
    removeRepositoryBookmarkOfId,
    isRepositoryOfIdBookmarked,
  };
};
