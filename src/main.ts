import UAParser from 'ua-parser-js';

import './styles/normalize.css';
import './styles/fonts.scss';
import './styles/base.scss';

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const parser = new UAParser(navigator.userAgent);
if (parser.getBrowser().name === 'Chrome') {
  document.documentElement.classList.add('is-chrome');
  document.body.classList.add('is-chrome');
}

createApp(App).use(store).mount('#app');
