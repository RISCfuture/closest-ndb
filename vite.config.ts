import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: 'localhost'
  },
  plugins: [
    vue(),
    process.env.NODE_ENV == 'development' ? vueDevTools({ launchEditor: 'rubymine' }) : false
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true
  },
  base: '/closest-ndb'
})
