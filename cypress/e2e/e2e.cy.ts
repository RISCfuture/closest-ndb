// https://on.cypress.io/api

import type { SinonStub } from 'cypress/types/sinon'

describe('Website', () => {
  let stub: SinonStub<unknown[], unknown> | undefined = undefined
  afterEach(() => stub?.restore())

  it('shows the closest NDB', () => {
    cy.visit('/', {
      onBeforeLoad({ navigator }) {
        stub = cy
          .stub(navigator.geolocation, 'getCurrentPosition')
          .callsArgWith(0, { coords: { latitude: 36.0, longitude: -121.0 } })
      }
    })
    cy.findByRole('heading').contains('Where’s the closest NDB to me right now?')
    cy.findByTestId('ndb-distance').contains('9 NM')
    cy.findByTestId('ndb-name').contains('HUNTER LIGGETT')
  })

  it('displays a message if the user does not turn on location', () => {
    cy.visit('/', {
      onBeforeLoad({ navigator }) {
        stub = cy.stub(navigator.geolocation, 'getCurrentPosition').callsArgWith(1, {
          code: GeolocationPositionError.PERMISSION_DENIED,
          message: 'User denied Geolocation'
        })
      }
    })
    cy.findByText('Location permission was denied').should('exist')
    cy.findByRole('button', { name: 'Try Again' }).should('exist')
    
    // Test retry functionality
    cy.findByRole('button', { name: 'Try Again' }).click()
    
    // After retry fails, button text should change
    cy.findByRole('button', { name: 'Still Not Working? Did You Change Your Browser Settings?' }).should('exist')
    
    // Test another retry - button text should stay the same
    cy.findByRole('button', { name: 'Still Not Working? Did You Change Your Browser Settings?' }).click()
    cy.findByRole('button', { name: 'Still Not Working? Did You Change Your Browser Settings?' }).should('exist')
  })

  it('displays a message if the location is unknown', () => {
    cy.visit('/', {
      onBeforeLoad({ navigator }) {
        stub = cy.stub(navigator.geolocation, 'getCurrentPosition').callsArgWith(1, {
          code: GeolocationPositionError.POSITION_UNAVAILABLE,
          message: 'Position unavailable'
        })
      }
    })
    cy.findByText('Unable to get your location').should('exist')
    cy.findByText('Position unavailable').should('exist')
    cy.findByRole('button', { name: 'Try Again' }).should('exist')
    
    // Test retry functionality
    cy.findByRole('button', { name: 'Try Again' }).click()
    cy.findByRole('button', { name: 'Still Not Working? Did You Change Your Browser Settings?' }).should('exist')
  })

  it('successfully retries after initial failure', () => {
    let callCount = 0
    cy.visit('/', {
      onBeforeLoad({ navigator }) {
        stub = cy.stub(navigator.geolocation, 'getCurrentPosition').callsFake((success, error) => {
          callCount++
          if (callCount === 1) {
            // First call fails
            error({
              code: GeolocationPositionError.POSITION_UNAVAILABLE,
              message: 'Position unavailable'
            })
          } else {
            // Subsequent calls succeed
            success({ coords: { latitude: 36.0, longitude: -121.0 } })
          }
        })
      }
    })
    
    // Initially shows error
    cy.findByText('Unable to get your location').should('exist')
    cy.findByRole('button', { name: 'Try Again' }).should('exist')
    
    // Click retry and it succeeds
    cy.findByRole('button', { name: 'Try Again' }).click()
    
    // Should now show the NDB info
    cy.findByTestId('ndb-distance').should('exist')
    cy.findByTestId('ndb-name').should('exist')
  })

  it('displays other errors', () => {
    cy.visit('/', {
      onBeforeLoad({ navigator }) {
        stub = cy
          .stub(navigator.geolocation, 'getCurrentPosition')
          .callsArgWith(1, { code: -1, message: 'Timeout' })
      }
    })
    cy.findByText('Unable to get your location').should('exist')
    cy.findByText('Timeout').should('exist')
    cy.findByRole('button', { name: 'Try Again' }).should('exist')
    
    // Test retry functionality
    cy.findByRole('button', { name: 'Try Again' }).click()
    cy.findByRole('button', { name: 'Still Not Working? Did You Change Your Browser Settings?' }).should('exist')
  })
})
