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
import { recoverFromPreloadErrors } from '@/utils/preloadRecovery'

recoverFromPreloadErrors()

const parser = new UAParser(navigator.userAgent)
if (parser.getBrowser().name === 'Chrome') {
  document.documentElement.classList.add('is-chrome')
  document.body.classList.add('is-chrome')
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Vue SFC default export typing
const app = createApp(App)

const sentryDSN = import.meta.env.VITE_SENTRY_DSN
Sentry.init({
  app,
  dsn: sentryDSN,
  release: import.meta.env.VITE_SENTRY_RELEASE || undefined,
  environment: import.meta.env.PROD ? 'production' : 'development',
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.vueIntegration({
      tracingOptions: {
        trackComponents: true,
      },
    }),
    Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
  ],
  tracesSampleRate: 1.0,
  enableLogs: true,
  // Transient browser/network noise when fetching the auto-injected service worker script.
  ignoreErrors: [/Failed to register a ServiceWorker/u],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

const pinia = createPinia()
pinia.use(createSentryPiniaPlugin())
app.use(pinia)

app.use(i18n)

app.mount('#app')

/**
 * Installs the Workbox service worker that backs offline use.
 *
 * A failed registration costs offline caching and nothing else, so the
 * rejection is logged rather than left to surface as an unhandled error.
 */
function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    const swURL = `${import.meta.env.BASE_URL}sw.js`
    navigator.serviceWorker
      .register(swURL, { scope: import.meta.env.BASE_URL })
      .catch((error: unknown) => {
        Sentry.logger.warn('Service worker registration failed', {
          reason: error instanceof Error ? error.message : String(error),
        })
      })
  })
}

// Only a production build emits `sw.js`.
if (import.meta.env.PROD) registerServiceWorker()
