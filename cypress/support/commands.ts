import '@testing-library/cypress/add-commands'
import type { SinonStub } from 'cypress/types/sinon'

/**
 * App Action: visit with geolocation stubbed to succeed.
 */
Cypress.Commands.add(
  'visitWithGeolocationSuccess',
  (latitude: number, longitude: number): Cypress.Chainable<SinonStub> => {
    let stub: SinonStub
    return cy
      .visit('/', {
        onBeforeLoad({ navigator }) {
          stub = cy
            .stub(navigator.geolocation, 'getCurrentPosition')
            .callsArgWith(0, { coords: { latitude, longitude } })
        },
      })
      .then(() => stub)
  },
)

/**
 * App Action: visit with geolocation stubbed to fail.
 */
Cypress.Commands.add(
  'visitWithGeolocationError',
  (code: number, message: string): Cypress.Chainable<SinonStub> => {
    let stub: SinonStub
    return cy
      .visit('/', {
        onBeforeLoad({ navigator }) {
          stub = cy
            .stub(navigator.geolocation, 'getCurrentPosition')
            .callsArgWith(1, { code, message })
        },
      })
      .then(() => stub)
  },
)

/**
 * App Action: visit with geolocation stubbed using a custom fake
 * that changes behavior across calls (e.g., fail first, succeed later).
 */
Cypress.Commands.add(
  'visitWithGeolocationFake',
  (
    fake: (success: PositionCallback, error: PositionErrorCallback) => void,
  ): Cypress.Chainable<SinonStub> => {
    let stub: SinonStub
    return cy
      .visit('/', {
        onBeforeLoad({ navigator }) {
          stub = cy.stub(navigator.geolocation, 'getCurrentPosition').callsFake(fake)
        },
      })
      .then(() => stub)
  },
)

declare global {
  namespace Cypress {
    interface Chainable {
      visitWithGeolocationSuccess(latitude: number, longitude: number): Chainable<SinonStub>
      visitWithGeolocationError(code: number, message: string): Chainable<SinonStub>
      visitWithGeolocationFake(
        fake: (success: PositionCallback, error: PositionErrorCallback) => void,
      ): Chainable<SinonStub>
    }
  }
}

export {}
