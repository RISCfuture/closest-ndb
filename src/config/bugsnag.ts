import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import BugsnagPerformance from '@bugsnag/browser-performance'

Bugsnag.start({
  apiKey: 'd214574b02750f3fbb4609cb8dda9a0a',
  plugins: [new BugsnagPluginVue()]
})
BugsnagPerformance.start({ apiKey: 'd214574b02750f3fbb4609cb8dda9a0a' })

const bugsnagVue = Bugsnag.getPlugin('vue')
export default bugsnagVue
