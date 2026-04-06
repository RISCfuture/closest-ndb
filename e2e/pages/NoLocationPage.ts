import type { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Page object for the error/no-location view.
 * Displayed when geolocation fails or permission is denied.
 */
export class NoLocationPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  get errorHeading(): Locator {
    return this.page.getByRole('heading', { level: 2 })
  }

  get retryButton(): Locator {
    return this.page.getByRole('button', { name: /try again/i })
  }

  get stillNotWorkingButton(): Locator {
    return this.page.getByRole('button', { name: /still not working/i })
  }

  async clickRetry(): Promise<void> {
    await this.retryButton.click()
  }

  async clickStillNotWorking(): Promise<void> {
    await this.stillNotWorkingButton.click()
  }
}
