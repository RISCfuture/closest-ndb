import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import csp from 'vite-plugin-csp-guard'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  server: {
    host: 'localhost',
  },
  plugins: [
    vue(),
    process.env.NODE_ENV == 'development' ? vueDevTools({ launchEditor: 'rubymine' }) : false,
    command === 'build' &&
      csp({
        dev: { run: false },
        build: { sri: false },
        policy: {
          'default-src': ["'self'"],
          'script-src': ["'self'"],
          'style-src': ["'self'"],
          'style-src-attr': ["'unsafe-inline'"],
          'img-src': ["'self'", 'data:', 'blob:'],
          'font-src': ["'self'"],
          'connect-src': ["'self'", 'https://*.ingest.sentry.io', 'https://*.sentry.io'],
          'worker-src': ["'self'", 'blob:'],
          'child-src': ["'self'", 'blob:'],
          'object-src': ["'none'"],
          'base-uri': ["'self'"],
          'form-action': ["'self'"],
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  base: '/closest-ndb',
}))
