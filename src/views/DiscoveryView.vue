<script setup>
import { useRepositoriesStore } from "@/stores/useRepositoriesStore";
import { useTopicsStore } from "@/stores/useTopicsStore";
import { reactive } from "vue";

// components
import TopicRepositoriesList from "../components/TopicRepositoriesList.vue";
import AppButton from "../components/ui/AppButton.vue";
import AppSectionTitle from "../components/ui/AppSectionTitle.vue";

const topicsStore = useTopicsStore();
const { repositories: bookmarks } = useRepositoriesStore();

const selectedTopics = reactive([...topicsStore.allTopics]);
const toggleTopicSelection = (topic) => {
  const index = selectedTopics.indexOf(topic);
  if (index < 0) selectedTopics.push(topic);
  else selectedTopics.splice(index, 1);
};
</script>

<template>
  <main>
    <!-- Bookmarks section -->
    <section>
      <AppSectionTitle title="My Bookmarks"></AppSectionTitle>
      <ul v-if="bookmarks.length">
        <li v-for="repo in bookmarks" :key="repo.Id">
          repo: {{ repo.FullName }}
        </li>
      </ul>
    </section>

    <!-- Topics Toggler section -->
    <section>
      <h4 class="mb-2">Toggle topics to show</h4>
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

    <!-- Repo Listing section -->
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

  .topics-list {
    > *:not(:last-child) {
      @apply mr-2;
    }
  }
}
</style>
