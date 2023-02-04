import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

// store - state management
const pinia = createPinia();
app.use(pinia);

// router
app.use(router);

app.mount("#app");
