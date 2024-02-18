import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  projectId: '9mqf5o',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    viewportWidth: 640,
    viewportHeight: 812,
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    }
  }
})
