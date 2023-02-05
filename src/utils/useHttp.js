import { ref } from "vue";
import httpClient from "../infra/httpClient";

const useHttpResult = () => {
  const loading = ref(false);
  const data = ref(null);
  const error = ref(null);

  return { loading, data, error };
};

export const useHttp = () => {
  // GET method request
  const get = async (url) => {
    const { loading, data, error } = useHttpResult();

    try {
      loading.value = true;
      const response = await httpClient.get(url);
      console.log({ response });
      data.value = response.data;
    } catch (err) {
      error.value = err;
    }
    loading.value = false;

    return { loading, data, error };
  };

  return { get };
};
