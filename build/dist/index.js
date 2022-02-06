import { createApp } from "../_snowpack/pkg/vue.js";
import App from "./App.vue.js";

import { createPinia } from "../_snowpack/pkg/pinia.js";

let app = createApp(App);

app.use(createPinia());

let vm = app.mount("#root");
