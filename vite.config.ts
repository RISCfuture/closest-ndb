import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import csp from 'vite-plugin-csp-guard'
import { VitePWA } from 'vite-plugin-pwa'

const SENTRY_PACKAGE = /node_modules\/(\.pnpm\/)?@sentry/u
const SENTRY_REPLAY_PACKAGE = /replay|rrweb/u
const VENDOR_PACKAGE = /node_modules\/(\.pnpm\/)?(@vue|@intlify|vue|vue-i18n|pinia)[@/]/u

/**
 * Splits the framework, Sentry's core, and Sentry's session replay recorder into chunks of their
 * own, so the app's own code is no longer one bundle the browser must have in full before it can
 * mount.
 *
 * @param id - Absolute path of the module being placed.
 * @returns The name of the chunk the module belongs in, or `undefined` to leave the choice to the
 *   bundler.
 */
function manualChunks(id: string): string | undefined {
  if (SENTRY_PACKAGE.test(id)) return SENTRY_REPLAY_PACKAGE.test(id) ? 'sentry-replay' : 'sentry'
  if (VENDOR_PACKAGE.test(id)) return 'vendor'

  return undefined
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  server: {
    host: 'localhost',
  },
  plugins: [
    vue(),
    command === 'serve' && vueDevTools({ launchEditor: process.env.VITE_LAUNCH_EDITOR }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      injectRegister: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest,woff2,json}'],
        // This site has no client-side router, so an unknown path is a real 404.
        // vite-plugin-pwa otherwise defaults this to index.html, which makes the
        // service worker answer every unknown path with the home page.
        navigateFallback: undefined,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
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
    sourcemap: 'hidden',
    rollupOptions: {
      output: { manualChunks },
    },
  },
  base: '/closest-ndb/',
}))
