import Repository from "@/models/Repository";
import { getRepositories } from "@/services/repositories";
import { reactive, computed } from "vue";

export const useRepositoriesStore = () => {
  const state = reactive({
    repositoriesData: [],
  });

  const repositories = computed(() => {
    console.log(state.repositoriesData);
    return state.repositoriesData.map(
      (r) => new Repository(r.id, r.fullName, r.hyperlink)
    );
  });

  const getRepositoriesOfQuery = async (query) => {
    let error, data;
    await getRepositories(query)
      .then((items) => {
        state.repositoriesData = data = [...items];
      })
      .catch((err) => (error = err));
    return [error, data];
  };

  return {
    repositories,
    getRepositoriesOfQuery,
  };
};
