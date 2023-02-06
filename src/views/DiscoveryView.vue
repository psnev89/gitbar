<script setup>
import { useRepositoriesStore } from "@/stores/useRepositoriesStore";
import { useTopicsStore } from "@/stores/useTopicsStore";
import { reactive } from "vue";

// components
import TopicRepositoriesSection from "../components/TopicRepositoriesSection.vue";
import AppButton from "../components/ui/AppButton.vue";
import AppSectionTitle from "../components/ui/AppSectionTitle.vue";
import RepositoryList from "../components/RepositoryList.vue";

const topicsStore = useTopicsStore();
const { bookmarkedRepositories } = useRepositoriesStore();

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
      <AppSectionTitle title="My Bookmarks" class="mb-4"></AppSectionTitle>

      <RepositoryList
        v-if="bookmarkedRepositories.length"
        :repositories="bookmarkedRepositories"
        :per-page="6"
      ></RepositoryList>
      <div v-else class="text-sm text-left">
        Bookmarked repositories will be displayed here
      </div>
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
        <TopicRepositoriesSection
          v-show="selectedTopics.includes(topic)"
          :topic="topic"
        ></TopicRepositoriesSection>
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
