import { createPinia } from 'pinia';
import { createApp } from 'vue';

import PrimeCarousel from 'primevue/carousel';
import PrimeVue from 'primevue/config';
import PrimeDeferredContent from 'primevue/deferredcontent';
import PrimeInputText from 'primevue/inputtext';
import PrimeMenubar from 'primevue/menubar';
import PrimePaginator from 'primevue/paginator';
import PrimeProgressBar from 'primevue/progressbar';
import PrimeTag from 'primevue/tag';
import PrimeToast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';

import { useConfigStore } from '@/stores/ConfigStore';

import App from './App.vue';
import './assets/main.scss';
import router from './router';

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
app.component('PrimeDeferredContent', PrimeDeferredContent);
app.component('PrimePaginator', PrimePaginator);
app.component('PrimeProgressBar', PrimeProgressBar);

app.mount('#app');
