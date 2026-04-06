import type { Page, Locator } from '@playwright/test'

export class BasePage {
  constructor(readonly page: Page) {}

  get heading(): Locator {
    return this.page.getByRole('heading', { level: 1 })
  }
}
