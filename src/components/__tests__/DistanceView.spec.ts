import { describe, expect, it } from 'vitest'
import DistanceView from '../DistanceView.vue'
import i18n from '../../i18n'
import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'

describe('DistanceView', () => {
  describe('with known distance', () => {
    it('renders the distance', () => {
      render(DistanceView, {
        props: { distance: 10 },
        global: { plugins: [i18n] }
      })
      expect(page.getByTestId('ndb-distance').element().textContent).toBe('10 NM')
    })
  })

  describe('with unknown distance', () => {
    it('renders “???”', () => {
      render(DistanceView, {
        global: { plugins: [i18n] }
      })
      expect(page.getByTestId('ndb-distance').element().textContent).toBe('???')
    })
  })

  describe('without location permission', () => {
    const error = {
      code: GeolocationPositionError.PERMISSION_DENIED,
      message: 'Location permission denied'
    } as GeolocationPositionError

    it('renders a “location not given” message', () => {
      render(DistanceView, {
        props: { error },
        global: { plugins: [i18n] }
      })
      expect(page.getByTestId('ndb-distance').element().textContent).toBe(
        'Location permission denied :('
      )
    })
  })

  describe('with unknown location', () => {
    const error = {
      code: GeolocationPositionError.POSITION_UNAVAILABLE,
      message: 'Position unavailable'
    } as GeolocationPositionError

    it('renders “???”', () => {
      render(DistanceView, {
        props: { error },
        global: { plugins: [i18n] }
      })
      expect(page.getByTestId('ndb-distance').element().textContent).toBe('???')
    })
  })

  describe('with other error', () => {
    const error = {
      code: -1,
      message: 'Other error'
    } as GeolocationPositionError

    it('renders the error', () => {
      render(DistanceView, {
        props: { error },
        global: { plugins: [i18n] }
      })
      expect(page.getByTestId('ndb-distance').element().textContent).toBe('Other error')
    })
  })
})
