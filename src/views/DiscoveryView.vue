<script setup>
import { useRepositoriesStore } from "@/stores/useRepositoriesStore";
import { useTopicsStore } from "@/stores/useTopicsStore";
import { reactive } from "vue";

// components
import TopicRepositoriesList from "../components/TopicRepositoriesList.vue";
import AppButton from "../components/ui/AppButton.vue";

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
    <section v-show="bookmarks.length">
      <h2>My Bookmarks</h2>
      <ul>
        <li v-for="repo in bookmarks" :key="repo.Id">
          repo: {{ repo.FullName }}
        </li>
      </ul>
    </section>
    <section>
      <h4>Toggle topics to show</h4>
      <div class="topics-list">
        <AppButton
          v-for="topic in topicsStore.allTopics"
          :key="topic"
          :label="topicsStore.getByKey(topic).displayName"
          :active="selectedTopics.includes(topic)"
          pill
          @click="toggleTopicSelection(topic)"
        ></AppButton>
      </div>
    </section>

    <template v-for="topic in topicsStore.allTopics" :key="topic">
      <section>
        <TopicRepositoriesList
          v-show="selectedTopics.includes(topic)"
          :topic="topic"
        ></TopicRepositoriesList>
      </section>
    </template>
  </main>
</template>

<style scoped lang="scss">
main {
  > section {
    @apply mb-16;
  }
}
</style>
