import './styles/normalize.css';
import './styles/fonts.scss';
import './styles/base.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
