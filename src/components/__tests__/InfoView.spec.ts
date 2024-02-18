import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoView from '../InfoView.vue'
import i18n from '../../i18n'

describe('InfoView', () => {
  it('renders NDB information', () => {
    const wrapper = mount(InfoView, {
      props: {
        ndb: {
          id: 'TG',
          name: 'TOPGUN',
          lat: 118353,
          lon: -421695,
          freq: '661'
        }
      },
      global: {
        plugins: [i18n]
      }
    })

    expect(wrapper.get('.name').text()).toBe('TOPGUN')
    expect(wrapper.get('.info-line').text()).toBe('661TGTG')
    expect(wrapper.get('.lat-lon').text()).toBe('N33°52.55′ W117°08.25′')
  })
})
