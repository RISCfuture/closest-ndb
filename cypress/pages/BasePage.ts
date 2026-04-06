export class BasePage {
  protected wrap(chainable: Cypress.Chainable): this {
    chainable
    return this
  }

  heading() {
    return cy.findByRole('heading', { level: 1 })
  }
}
