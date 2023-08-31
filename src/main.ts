import './config/bugsnag'

import './styles/normalize.css'
import './styles/fonts.scss'
import './styles/base.scss'

import { createApp } from 'vue'
import Bugsnag from '@bugsnag/js'
import UAParser from 'ua-parser-js'

import App from './App.vue'
import store from './store'

const parser = new UAParser(navigator.userAgent)
if (parser.getBrowser().name === 'Chrome') {
  document.documentElement.classList.add('is-chrome')
  document.body.classList.add('is-chrome')
}

const bugsnagVue = Bugsnag.getPlugin('vue')

const app = createApp(App)
app.use(store)
if (bugsnagVue) app.use(bugsnagVue)
app.mount('#app')
