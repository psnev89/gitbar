import Repository from "@/models/Repository";
import { getRepositories } from "@/services/repositories";
import { reactive, computed } from "vue";
import { useBookmarksStore } from "./useBookmarksStore";

export const useRepositoriesStore = () => {
  // local state
  const state = reactive({
    repositoriesData: [],
    totalNumberOfPages: 1,
  });

  const { bookmarkOfIdExists } = useBookmarksStore();

  const repositories = computed(() => {
    return state.repositoriesData.map(
      (r) =>
        new Repository(r.id, r.fullName, r.hyperlink, bookmarkOfIdExists(r.id))
    );
  });

  const totalPages = computed(() => state.totalNumberOfPages);

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

  const getRepositoryOfId = (repoId) => {
    return state.repositoriesData.find((r) => r.id === repoId);
  };

  return {
    repositories,
    totalPages,
    getRepositoryOfId,
    getRepositoriesOfQuery,
  };
};
