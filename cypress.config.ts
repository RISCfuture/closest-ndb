import path from 'path'
import { defineConfig } from 'cypress'
import { build } from 'vite'

/**
 * Inline Vite preprocessor for Cypress, compatible with Vite 8+ (rolldown).
 * Replaces cypress-vite which only supports Vite up to v7.
 */
function vitePreprocessor() {
  return async (file: Cypress.FileObject) => {
    const { outputPath, filePath } = file
    const fileName = path.basename(outputPath)
    const filenameWithoutExtension = path.basename(outputPath, path.extname(outputPath))

    await build({
      logLevel: 'warn',
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
      build: {
        emptyOutDir: false,
        minify: false,
        outDir: path.dirname(outputPath),
        sourcemap: true,
        write: true,
        lib: {
          entry: filePath,
          fileName: () => fileName,
          formats: ['umd'],
          name: filenameWithoutExtension,
        },
      },
    })

    return outputPath
  }
}

export default defineConfig({
  projectId: '9mqf5o',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    viewportWidth: 640,
    viewportHeight: 812,
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    },
  },
})
