<script setup>
import { useTopicsStore } from "@/stores/useTopicsStore";
import { reactive } from "vue";

// components
import TopicRepositoriesSection from "@/components/TopicRepositoriesSection.vue";
import BookmarkedRepositoriesSection from "@/components/BookmarkedRepositoriesSection.vue";
import AppButton from "@/components/ui/AppButton.vue";

const topicsStore = useTopicsStore();

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
    <BookmarkedRepositoriesSection></BookmarkedRepositoriesSection>

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
      <TopicRepositoriesSection
        v-show="selectedTopics.includes(topic)"
        :topic="topic"
      ></TopicRepositoriesSection>
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
