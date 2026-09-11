/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string
  readonly VITE_SENTRY_RELEASE: string
}

/** One entry of the browser brand list reported by User-Agent Client Hints. */
interface NavigatorUABrandVersion {
  readonly brand: string
  readonly version: string
}

/** The subset of the User-Agent Client Hints `NavigatorUAData` interface this app reads. */
interface NavigatorUAData {
  readonly brands: readonly NavigatorUABrandVersion[]
  readonly mobile: boolean
}

interface Navigator {
  /** Undefined outside Chromium-based browsers. */
  readonly userAgentData?: NavigatorUAData
}
