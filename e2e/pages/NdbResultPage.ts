import type { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Page object for the successful NDB result view.
 * Displayed when geolocation succeeds and a closest NDB is found.
 */
export class NdbResultPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  get distance(): Locator {
    return this.page.getByTestId('ndb-distance')
  }

  get name(): Locator {
    return this.page.getByTestId('ndb-name')
  }
}
