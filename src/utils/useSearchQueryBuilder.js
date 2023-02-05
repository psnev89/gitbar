import { ref } from "vue";

export const useSearchQueryBuilder = () => {
  const topic = ref(null);
  const perPage = ref(null);
  const page = ref(null);
  const sort = ref(null);

  const builder = {
    byTopic: function ($topic) {
      if (!$topic) throw Error("Search Query Builder: Topic must be provided");
      topic.value = `topic:${$topic}`;
      return this;
    },
    setPerPage: function ($perPage) {
      perPage.value = Number($perPage);
      return this;
    },
    setPage: function ($page) {
      page.value = Number($page);
      return this;
    },
    sortBy: function ($sort) {
      sort.value = $sort;
      return this;
    },
    build: function () {
      return `?q=${topic.value}&per_page=${perPage.value}&page=${page.value}&sort=${sort.value}`;
    },
  };

  return builder;
};
