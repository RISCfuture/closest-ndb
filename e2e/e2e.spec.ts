import { test, expect } from './fixtures'

test.describe('Website', () => {
  test.describe('when geolocation succeeds', () => {
    test('shows the closest NDB', async ({ geoSuccess, ndbResultPage }) => {
      await geoSuccess(36.0, -121.0)

      await expect(ndbResultPage.heading).toContainText('\u2019s the closest NDB to me right now?')
      await expect(ndbResultPage.distance).toContainText('9 NM')
      await expect(ndbResultPage.name).toContainText('HUNTER LIGGETT')
    })
  })

  test.describe('when geolocation permission is denied', () => {
    test.beforeEach(async ({ geoError }) => {
      await geoError(1, 'User denied Geolocation')
    })

    test('displays a permission denied message', async ({ page, noLocationPage }) => {
      await expect(page.getByText('Location permission was denied')).toBeVisible()
      await expect(noLocationPage.retryButton).toBeVisible()
    })

    test('changes retry button text after failed retry', async ({ noLocationPage }) => {
      await noLocationPage.clickRetry()
      await expect(noLocationPage.stillNotWorkingButton).toBeVisible()
    })

    test('keeps the still-not-working button text on subsequent retries', async ({
      noLocationPage,
    }) => {
      await noLocationPage.clickRetry()
      await noLocationPage.clickStillNotWorking()
      await expect(noLocationPage.stillNotWorkingButton).toBeVisible()
    })
  })

  test.describe('when position is unavailable', () => {
    test.beforeEach(async ({ geoError }) => {
      await geoError(2, 'Position unavailable')
    })

    test('displays an error message with details', async ({ page, noLocationPage }) => {
      await expect(page.getByText('Unable to get your location')).toBeVisible()
      await expect(page.getByText('Position unavailable')).toBeVisible()
      await expect(noLocationPage.retryButton).toBeVisible()
    })

    test('changes retry button text after failed retry', async ({ noLocationPage }) => {
      await noLocationPage.clickRetry()
      await expect(noLocationPage.stillNotWorkingButton).toBeVisible()
    })
  })

  test.describe('when geolocation fails then succeeds on retry', () => {
    test('recovers and shows NDB info after retry', async ({
      geoFake,
      noLocationPage,
      ndbResultPage,
      page,
    }) => {
      await geoFake(`
        let callCount = 0;
        navigator.geolocation.getCurrentPosition = (success, error) => {
          callCount++;
          if (callCount === 1) {
            error({
              code: 2,
              message: 'Position unavailable',
              PERMISSION_DENIED: 1,
              POSITION_UNAVAILABLE: 2,
              TIMEOUT: 3,
            });
          } else {
            success({ coords: { latitude: 36.0, longitude: -121.0 } });
          }
        };
      `)

      await expect(page.getByText('Unable to get your location')).toBeVisible()
      await expect(noLocationPage.retryButton).toBeVisible()

      await noLocationPage.clickRetry()

      await expect(ndbResultPage.distance).toBeVisible()
      await expect(ndbResultPage.name).toBeVisible()
    })
  })

  test.describe('when geolocation fails with other errors', () => {
    test.beforeEach(async ({ geoError }) => {
      await geoError(-1, 'Timeout')
    })

    test('displays a generic error message', async ({ page, noLocationPage }) => {
      await expect(page.getByText('Unable to get your location')).toBeVisible()
      await expect(page.getByText('Timeout')).toBeVisible()
      await expect(noLocationPage.retryButton).toBeVisible()
    })

    test('changes retry button text after failed retry', async ({ noLocationPage }) => {
      await noLocationPage.clickRetry()
      await expect(noLocationPage.stillNotWorkingButton).toBeVisible()
    })
  })
})
