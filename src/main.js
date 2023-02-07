import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import "@/assets/main.scss";

const app = createApp(App);

// router
app.use(router);

// toasts
app.use(Toast, {
  timeout: 3000,
  position: POSITION.BOTTOM_LEFT,
});

app.mount("#app");
