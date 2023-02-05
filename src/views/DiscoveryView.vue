<script setup>
import { useRepositoriesStore } from "@/stores/useRepositoriesStore";
import { useTopicsStore } from "@/stores/useTopicsStore";
import { reactive } from "vue";

// components
import TopicRepositoriesList from "../components/TopicRepositoriesList.vue";

const topicsStore = useTopicsStore();
const { repositories: bookmarks } = useRepositoriesStore();

// onMounted(async () => {
//   const [error] = await repositoriesStore.getRepositories();
//   if (error) console.warn("Error fetching repositories");
// });

const selectedTopics = reactive([...topicsStore.allTopics]);
const toggleTopicSelection = (topic) => {
  const index = selectedTopics.indexOf(topic);
  if (index < 0) selectedTopics.push(topic);
  else selectedTopics.splice(index, 1);
};
</script>

<template>
  <main>
    <div v-show="bookmarks.length">
      <h2>My Bookmarks</h2>
      <ul>
        <li v-for="repo in bookmarks" :key="repo.Id">
          repo: {{ repo.FullName }}
        </li>
      </ul>
    </div>
    <h4>Toggle topics to show</h4>
    <ul>
      <li v-for="topic in topicsStore.allTopics" :key="topic">
        <button @click="toggleTopicSelection(topic)">
          {{ topicsStore.getByKey(topic).displayName }}
        </button>
      </li>
    </ul>
    <template v-for="topic in topicsStore.allTopics" :key="topic">
      <TopicRepositoriesList
        v-show="selectedTopics.includes(topic)"
        :topic="topic"
      ></TopicRepositoriesList>
    </template>
  </main>
</template>
