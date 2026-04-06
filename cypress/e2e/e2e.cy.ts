import type { SinonStub } from 'cypress/types/sinon'
import { NdbResultPage } from '../pages/NdbResultPage'
import { NoLocationPage } from '../pages/NoLocationPage'

describe('Website', () => {
  let stub: SinonStub | undefined

  afterEach(() => stub?.restore())

  describe('when geolocation succeeds', () => {
    const ndbResult = new NdbResultPage()

    beforeEach(() => {
      cy.visitWithGeolocationSuccess(36.0, -121.0).then((s) => {
        stub = s
      })
    })

    it('shows the closest NDB', () => {
      ndbResult.heading().should('contain.text', '\u2019s the closest NDB to me right now?')
      ndbResult.distance().should('contain.text', '9 NM')
      ndbResult.name().should('contain.text', 'HUNTER LIGGETT')
    })
  })

  describe('when geolocation permission is denied', () => {
    const noLocation = new NoLocationPage()

    beforeEach(() => {
      cy.visitWithGeolocationError(
        GeolocationPositionError.PERMISSION_DENIED,
        'User denied Geolocation',
      ).then((s) => {
        stub = s
      })
    })

    it('displays a permission denied message', () => {
      cy.findByText('Location permission was denied').should('exist')
      noLocation.retryButton().should('exist')
    })

    it('changes retry button text after failed retry', () => {
      noLocation.clickRetry()
      noLocation.stillNotWorkingButton().should('exist')
    })

    it('keeps the still-not-working button text on subsequent retries', () => {
      noLocation.clickRetry()
      noLocation.clickStillNotWorking()
      noLocation.stillNotWorkingButton().should('exist')
    })
  })

  describe('when position is unavailable', () => {
    const noLocation = new NoLocationPage()

    beforeEach(() => {
      cy.visitWithGeolocationError(
        GeolocationPositionError.POSITION_UNAVAILABLE,
        'Position unavailable',
      ).then((s) => {
        stub = s
      })
    })

    it('displays an error message with details', () => {
      cy.findByText('Unable to get your location').should('exist')
      cy.findByText('Position unavailable').should('exist')
      noLocation.retryButton().should('exist')
    })

    it('changes retry button text after failed retry', () => {
      noLocation.clickRetry()
      noLocation.stillNotWorkingButton().should('exist')
    })
  })

  describe('when geolocation fails then succeeds on retry', () => {
    const noLocation = new NoLocationPage()
    const ndbResult = new NdbResultPage()

    beforeEach(() => {
      let callCount = 0
      cy.visitWithGeolocationFake((success, error) => {
        callCount++
        if (callCount === 1) {
          error({
            code: GeolocationPositionError.POSITION_UNAVAILABLE,
            message: 'Position unavailable',
          } as GeolocationPositionError)
        } else {
          success({ coords: { latitude: 36.0, longitude: -121.0 } } as GeolocationPosition)
        }
      }).then((s) => {
        stub = s
      })
    })

    it('recovers and shows NDB info after retry', () => {
      cy.findByText('Unable to get your location').should('exist')
      noLocation.retryButton().should('exist')

      noLocation.clickRetry()

      ndbResult.distance().should('exist')
      ndbResult.name().should('exist')
    })
  })

  describe('when geolocation fails with other errors', () => {
    const noLocation = new NoLocationPage()

    beforeEach(() => {
      cy.visitWithGeolocationError(-1, 'Timeout').then((s) => {
        stub = s
      })
    })

    it('displays a generic error message', () => {
      cy.findByText('Unable to get your location').should('exist')
      cy.findByText('Timeout').should('exist')
      noLocation.retryButton().should('exist')
    })

    it('changes retry button text after failed retry', () => {
      noLocation.clickRetry()
      noLocation.stillNotWorkingButton().should('exist')
    })
  })
})
