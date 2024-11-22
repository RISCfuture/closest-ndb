import bugsnagVue from '@/config/bugsnag'

import 'normalize.css/normalize.css'
import './assets/styles/fonts.scss'
import './assets/styles/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { UAParser } from 'ua-parser-js'

import App from './App.vue'
import i18n from '@/i18n'

const parser = new UAParser(navigator.userAgent)
if (parser.getBrowser().name === 'Chrome') {
  document.documentElement.classList.add('is-chrome')
  document.body.classList.add('is-chrome')
}

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
if (bugsnagVue) app.use(bugsnagVue)

app.mount('#app')
