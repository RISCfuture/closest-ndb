import { createLogger, createStore } from 'vuex'
import createRootModule from '@/store/root'

const debug = process.env.NODE_ENV === 'development' && !navigator.userAgent.includes('Chrome')

const store = createStore({
  ...createRootModule(),
  plugins: debug ? [createLogger()] : [],
  strict: true,
})
store.dispatch('loadNDBs').catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})

export default store
