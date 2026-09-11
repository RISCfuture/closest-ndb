const DESKTOP_CHROME_BRAND = 'Google Chrome'
const CHROME_USER_AGENT = /Chrome\/\d/u
const MOBILE_USER_AGENT = /Mobile|Android/u
const OTHER_CHROMIUM_USER_AGENT = /Edg[A-Z]?\/|OPR\/|SamsungBrowser\/|CriOS\//u

/**
 * Whether the page is running in Chrome on a desktop.
 *
 * Desktop Chrome is the one browser that sizes `100vh` the way the layout expects, so `base.scss`
 * keys its `fill-available` fallback off the absence of the `is-chrome` class this answers.
 *
 * @returns `true` in desktop Chrome, `false` in every other browser including Chrome on mobile.
 */
export function isDesktopChrome(): boolean {
  const userAgentData = navigator.userAgentData
  if (userAgentData) return !userAgentData.mobile && userAgentData.brands.some(isDesktopChromeBrand)

  return chromeFromUserAgent(navigator.userAgent)
}

function isDesktopChromeBrand({ brand }: NavigatorUABrandVersion): boolean {
  return brand === DESKTOP_CHROME_BRAND
}

function chromeFromUserAgent(userAgent: string): boolean {
  if (!CHROME_USER_AGENT.test(userAgent)) return false
  if (MOBILE_USER_AGENT.test(userAgent)) return false

  return !OTHER_CHROMIUM_USER_AGENT.test(userAgent)
}
