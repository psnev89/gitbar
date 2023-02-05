import topicsJson from "@/config/topics.json";
import { computed, reactive } from "vue";

export const useTopicsStore = () => {
  // local state
  const topics = reactive(new Map(Object.entries(topicsJson)));

  // getters
  const allTopics = computed(() => Array.from(topics.keys()));
  const getByKey = (key) => topics.get(key);

  return { allTopics: allTopics.value, getByKey };
};
