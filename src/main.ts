import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import PrimeCarousel from 'primevue/carousel';
import PrimeTag from 'primevue/tag';
import PrimeMenubar from 'primevue/menubar';
import PrimeInputText from 'primevue/inputtext';
import PrimeToast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';

import { useConfigStore } from '@/stores/ConfigStore';

import './assets/main.scss';
import router from './router';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(PrimeVue);
app.use(pinia);
app.use(router);
app.use(ToastService);

const store = useConfigStore();
store.setAxiosInterceptors();

app.component('PrimeCarousel', PrimeCarousel);
app.component('PrimeTag', PrimeTag);
app.component('PrimeInputText', PrimeInputText);
app.component('PrimeMenubar', PrimeMenubar);
app.component('PrimeToast', PrimeToast);

app.mount('#app');
