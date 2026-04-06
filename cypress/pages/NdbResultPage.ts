import { BasePage } from './BasePage'

/**
 * Page object for the successful NDB result view.
 * Displayed when geolocation succeeds and a closest NDB is found.
 */
export class NdbResultPage extends BasePage {
  distance() {
    return cy.findByTestId('ndb-distance')
  }

  name() {
    return cy.findByTestId('ndb-name')
  }

  frequency() {
    return cy.findByTestId('ndb-freq')
  }

  identifier() {
    return cy.findByTestId('ndb-id')
  }

  coordinates() {
    return cy.findByTestId('ndb-coords')
  }
}
