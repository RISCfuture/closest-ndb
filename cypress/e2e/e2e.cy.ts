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

  it('displays a message if the user does not turn on location', (done) => {
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('User denied Geolocation')
      done()
      return false
    })

    cy.visit('/', {
      onBeforeLoad({ navigator }) {
        stub = cy.stub(navigator.geolocation, 'getCurrentPosition').callsArgWith(1, {
          code: GeolocationPositionError.PERMISSION_DENIED,
          message: 'User denied Geolocation'
        })
      }
    })
    cy.findByTestId('ndb-distance').contains('Location permission denied :(')
  })

  it('displays a message if the location is unknown', (done) => {
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Position unavailable')
      done()
      return false
    })

    cy.visit('/', {
      onBeforeLoad({ navigator }) {
        stub = cy.stub(navigator.geolocation, 'getCurrentPosition').callsArgWith(1, {
          code: GeolocationPositionError.POSITION_UNAVAILABLE,
          message: 'Position unavailable'
        })
      }
    })
    cy.findByTestId('ndb-distance').contains('???')
  })

  it('displays other errors', (done) => {
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include('Timeout')
      done()
      return false
    })

    cy.visit('/', {
      onBeforeLoad({ navigator }) {
        stub = cy
          .stub(navigator.geolocation, 'getCurrentPosition')
          .callsArgWith(1, { code: -1, message: 'Timeout' })
      }
    })
    cy.findByTestId('ndb-distance').contains('Timeout')
  })
})
