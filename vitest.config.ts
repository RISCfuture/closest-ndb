import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import { type PluginOption, type UserConfig } from 'vite'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config.ts'

const VUE_DEVTOOLS_PLUGIN = 'vite-plugin-vue-devtools'

const resolvedViteConfig =
  typeof viteConfig === 'function' ? viteConfig({ command: 'serve', mode: 'test' }) : viteConfig

function pluginNames(plugin: PluginOption): string[] {
  if (Array.isArray(plugin)) return plugin.flatMap(pluginNames)
  return plugin && 'name' in plugin ? [plugin.name] : []
}

// Vue DevTools is gated on `command === 'serve'`, which a Vitest run also
// reports. It expects a real dev server behind it and throws while components
// mount without one, so it is dropped here rather than loosening the gate.
function withoutVueDevTools(config: UserConfig): UserConfig {
  return {
    ...config,
    plugins: (config.plugins ?? []).filter(
      (plugin) => !pluginNames(plugin).includes(VUE_DEVTOOLS_PLUGIN),
    ),
  }
}

export default mergeConfig(
  withoutVueDevTools(resolvedViteConfig),
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
