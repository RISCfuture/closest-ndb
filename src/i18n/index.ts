import { createI18n } from 'vue-i18n'
import messages from '@/i18n/messages'
import numberFormats from '@/i18n/numberFormats'

const i18n = createI18n({
  messages,
  numberFormats,
  locale: navigator.language,
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  legacy: false
})

export default i18n
