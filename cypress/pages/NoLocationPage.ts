import { BasePage } from './BasePage'

/**
 * Page object for the error/no-location view.
 * Displayed when geolocation fails or permission is denied.
 */
export class NoLocationPage extends BasePage {
  errorHeading() {
    return cy.findByRole('heading', { level: 2 })
  }

  errorMessage() {
    return cy.get('.no-location p')
  }

  retryButton() {
    return cy.findByRole('button', { name: /try again/i })
  }

  stillNotWorkingButton() {
    return cy.findByRole('button', {
      name: /still not working/i,
    })
  }

  clickRetry(): this {
    return this.wrap(this.retryButton().click())
  }

  clickStillNotWorking(): this {
    return this.wrap(this.stillNotWorkingButton().click())
  }
}
