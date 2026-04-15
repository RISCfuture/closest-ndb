import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config'

const resolvedViteConfig =
  typeof viteConfig === 'function' ? viteConfig({ command: 'serve', mode: 'test' }) : viteConfig

export default mergeConfig(
  resolvedViteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      globals: true,
      root: fileURLToPath(new URL('./', import.meta.url)),
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' }],
      },
    },
  }),
)
