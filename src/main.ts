import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import PrimeCarousel from 'primevue/carousel';
import PrimeTag from 'primevue/tag';
import PrimeMenubar from 'primevue/menubar';
import PrimeInputText from 'primevue/inputtext';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';

import './assets/main.scss';
import router from './router';

const app = createApp(App);
app.use(PrimeVue);

app.component('PrimeCarousel', PrimeCarousel);
app.component('PrimeTag', PrimeTag);
app.component('PrimeInputText', PrimeInputText);
app.component('PrimeMenubar', PrimeMenubar);

app.use(router);

app.mount('#app');
