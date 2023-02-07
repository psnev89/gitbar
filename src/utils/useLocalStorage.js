import { ref } from "vue";

export const useLocalStorage = (context) => {
  const stored = JSON.parse(localStorage.getItem(context));

  const value = ref(stored);

  const remove = () => localStorage.removeItem(context);

  const set = (val) => {
    if (!val) {
      remove();
    } else {
      localStorage.setItem(context, JSON.stringify(val));
      value.value = val;
    }
  };

  const get = () => {
    return JSON.parse(localStorage.getItem(context));
  };

  return { set, get, remove };
};
