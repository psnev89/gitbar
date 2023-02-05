<script setup>
import { onMounted, readonly, reactive, watchEffect } from "vue";
import { useRepositoriesStore } from "@/stores/useRepositoriesStore";
import { useTopicsStore } from "@/stores/useTopicsStore";
import sortByOptions from "@/config/reposSortOptions.json";

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
  topic: ctxTopic.apiValue,
  perPage: 10,
  page: 1,
  sort: "stars",
});

watchEffect(async () => {
  const [error] = await getRepositoriesOfQuery(searchQuery);
  if (error) console.warn("Error fetching repositories");
});
</script>

<template>
  <div>
    <h2>Top {{ ctxTopic.displayName }}</h2>
    <select v-model="searchQuery.sort">
      <option
        v-for="option in sortByOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.display }}
      </option>
    </select>
    <ul>
      <li v-for="repo in repositories" :key="repo.Id">
        repo: {{ repo.FullName }}
      </li>
    </ul>
  </div>
</template>
