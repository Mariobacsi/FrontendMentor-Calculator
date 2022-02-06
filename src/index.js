import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";

let app = createApp(App);

app.use(createPinia());

let vm = app.mount("#root");
