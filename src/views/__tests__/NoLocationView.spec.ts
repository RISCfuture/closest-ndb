import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import NoLocationView from '@/views/NoLocationView.vue'
import { useNavaidsStore } from '@/stores/navaids'
import { nextTick } from 'vue'
import i18n from '@/i18n'

describe('NoLocationView', () => {
  let wrapper: ReturnType<typeof mount>
  let store: ReturnType<typeof useNavaidsStore>

  beforeEach(() => {
    wrapper = mount(NoLocationView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), i18n]
      }
    })
    store = useNavaidsStore()
  })

  describe('without location error', () => {
    it('displays default header and body', () => {
      expect(wrapper.text()).toContain('Simply allow this web page to know your location')
      expect(wrapper.text()).toContain('How did you expect this to work')
    })

    it('does not show retry button', () => {
      expect(wrapper.find('.retry-button').exists()).toBe(false)
    })
  })

  describe('with permission denied error', () => {
    beforeEach(() => {
      store.$patch({
        locationError: {
          code: GeolocationPositionError.PERMISSION_DENIED,
          message: 'User denied Geolocation',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3
        } as GeolocationPositionError
      })
    })

    it('displays permission denied header and body', async () => {
      await nextTick()
      expect(wrapper.text()).toContain('Location permission was denied')
      expect(wrapper.text()).toContain('You need location access')
    })

    it('shows retry button', async () => {
      await nextTick()
      const button = wrapper.find('.retry-button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Try Again')
    })
  })

  describe('with other errors', () => {
    beforeEach(() => {
      store.$patch({
        locationError: {
          code: GeolocationPositionError.POSITION_UNAVAILABLE,
          message: 'Position unavailable',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3
        } as GeolocationPositionError
      })
    })

    it('displays error header and message', async () => {
      await nextTick()
      expect(wrapper.text()).toContain('Unable to get your location')
      expect(wrapper.text()).toContain('Position unavailable')
    })

    it('shows retry button', async () => {
      await nextTick()
      const button = wrapper.find('.retry-button')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Try Again')
    })
  })

  describe('retry functionality', () => {
    beforeEach(() => {
      store.$patch({
        locationError: {
          code: GeolocationPositionError.PERMISSION_DENIED,
          message: 'User denied Geolocation',
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3
        } as GeolocationPositionError
      })
    })

    it('calls setLocation when retry button is clicked', async () => {
      await nextTick()
      const button = wrapper.find('.retry-button')

      // Mock setLocation to resolve successfully
      store.setLocation = vi.fn().mockResolvedValue(undefined)

      await button.trigger('click')
      expect(store.setLocation).toHaveBeenCalled()
    })

    it('shows "retrying" text while retrying', async () => {
      await nextTick()
      const button = wrapper.find('.retry-button')

      // Mock setLocation to take some time
      store.setLocation = vi
        .fn()
        .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

      await button.trigger('click')
      await nextTick()

      expect(button.text()).toBe('Retrying…')
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('shows "still not working" after first failed retry', async () => {
      await nextTick()
      const button = wrapper.find('.retry-button')

      // Mock setLocation to reject
      store.setLocation = vi.fn().mockRejectedValue(new Error('Still denied'))

      await button.trigger('click')
      await nextTick()
      await nextTick() // Wait for async operations

      expect(button.text()).toBe('Still Not Working? Did You Change Your Browser Settings?')
    })

    it('prevents multiple simultaneous retries', async () => {
      await nextTick()
      const button = wrapper.find('.retry-button')

      // Mock setLocation to take some time
      store.setLocation = vi
        .fn()
        .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

      await button.trigger('click')
      await button.trigger('click')
      await button.trigger('click')

      expect(store.setLocation).toHaveBeenCalledTimes(1)
    })
  })
})
