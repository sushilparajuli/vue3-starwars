import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "./assets/scss/main.scss";

const app = createApp(App);
app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.use(ToastService);

app.mount("#app");
