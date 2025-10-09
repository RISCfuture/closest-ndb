import 'normalize.css/normalize.css'
import './assets/styles/fonts.scss'
import './assets/styles/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { UAParser } from 'ua-parser-js'
import * as Sentry from '@sentry/vue'
import { createSentryPiniaPlugin } from '@sentry/vue'

import App from './App.vue'
import i18n from '@/i18n'

const parser = new UAParser(navigator.userAgent)
if (parser.getBrowser().name === 'Chrome') {
  document.documentElement.classList.add('is-chrome')
  document.body.classList.add('is-chrome')
}

const app = createApp(App)

const sentryDSN = import.meta.env.VITE_SENTRY_DSN
Sentry.init({
  app,
  dsn: sentryDSN,
  sendDefaultPii: true,
  integrations: [
    Sentry.vueIntegration({
      tracingOptions: {
        trackComponents: true
      }
    }),
    Sentry.replayIntegration()
  ],
  tracesSampleRate: 1.0,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
})

const pinia = createPinia()
pinia.use(createSentryPiniaPlugin())
app.use(pinia)

app.use(i18n)

app.mount('#app')
