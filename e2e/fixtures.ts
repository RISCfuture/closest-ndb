import { test as base } from '@playwright/test'
import { NdbResultPage } from './pages/NdbResultPage'
import { NoLocationPage } from './pages/NoLocationPage'

type GeoFixtures = {
  ndbResultPage: NdbResultPage
  noLocationPage: NoLocationPage
  geoSuccess: (latitude: number, longitude: number) => Promise<void>
  geoError: (code: number, message: string) => Promise<void>
  geoFake: (script: string) => Promise<void>
}

export const test = base.extend<GeoFixtures>({
  ndbResultPage: async ({ page }, use) => {
    await use(new NdbResultPage(page))
  },

  noLocationPage: async ({ page }, use) => {
    await use(new NoLocationPage(page))
  },

  geoSuccess: async ({ context, page }, use) => {
    await use(async (latitude: number, longitude: number) => {
      await context.grantPermissions(['geolocation'])
      await context.setGeolocation({ latitude, longitude })
      await page.goto('/')
    })
  },

  geoError: async ({ page }, use) => {
    await use(async (code: number, message: string) => {
      await page.addInitScript(
        ({ code, message }) => {
          navigator.geolocation.getCurrentPosition = (
            _success: PositionCallback,
            error?: PositionErrorCallback | null,
          ) => {
            error?.({
              code,
              message,
              PERMISSION_DENIED: 1,
              POSITION_UNAVAILABLE: 2,
              TIMEOUT: 3,
            } as GeolocationPositionError)
          }
        },
        { code, message },
      )
      await page.goto('/')
    })
  },

  geoFake: async ({ page }, use) => {
    await use(async (script: string) => {
      await page.addInitScript(script)
      await page.goto('/')
    })
  },
})

export { expect } from '@playwright/test'
