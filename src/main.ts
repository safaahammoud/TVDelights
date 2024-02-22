import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';

import './assets/main.scss';
import router from './router';

const app = createApp(App);
app.use(PrimeVue);

/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */

app.component('Button', Button);
app.component('Carousel', Carousel);
app.component('Tag', Tag);
app.component('InputText', InputText);

app.use(router);

app.mount('#app');
