import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DistanceView from '../DistanceView.vue'
import i18n from '../../i18n'

describe('DistanceView', () => {
  describe('with known distance', () => {
    it('renders the distance', () => {
      const wrapper = mount(DistanceView, {
        props: { distance: 10 },
        global: { plugins: [i18n] }
      })
      expect(wrapper.text()).toContain('10 NM')
    })
  })

  describe('with unknown distance', () => {
    it('renders “???”', () => {
      const wrapper = mount(DistanceView, {
        global: { plugins: [i18n] }
      })
      expect(wrapper.text()).toContain('???')
    })
  })

  describe('without location permission', () => {
    const error = {
      code: GeolocationPositionError.PERMISSION_DENIED,
      message: 'Location permission denied'
    } as GeolocationPositionError

    it('renders a “location not given” message', () => {
      const wrapper = mount(DistanceView, {
        props: { error },
        global: { plugins: [i18n] }
      })
      expect(wrapper.text()).toContain('Location permission denied :(')
    })
  })

  describe('with unknown location', () => {
    const error = {
      code: GeolocationPositionError.POSITION_UNAVAILABLE,
      message: 'Position unavailable'
    } as GeolocationPositionError

    it('renders “???”', () => {
      const wrapper = mount(DistanceView, {
        props: { error },
        global: { plugins: [i18n] }
      })
      expect(wrapper.text()).toContain('???')
    })
  })

  describe('with other error', () => {
    const error = {
      code: -1,
      message: 'Other error'
    } as GeolocationPositionError

    it('renders the error', () => {
      const wrapper = mount(DistanceView, {
        props: { error },
        global: { plugins: [i18n] }
      })
      expect(wrapper.text()).toContain('Other error')
    })
  })
})
