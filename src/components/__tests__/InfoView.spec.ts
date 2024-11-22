import { describe, expect, it } from 'vitest'
import InfoView from '../InfoView.vue'
import i18n from '../../i18n'
import { render } from 'vitest-browser-vue'
import { page } from '@vitest/browser/context'

describe('InfoView', () => {
  it('renders NDB information', () => {
    render(InfoView, {
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

    expect(page.getByTestId('ndb-name').element().textContent).toBe('TOPGUN')
    expect(page.getByTestId('ndb-freq').element().textContent).toBe('661')
    expect(page.getByTestId('ndb-id').element().textContent).toBe('TG')
    expect(page.getByTestId('ndb-coords').element().textContent).toBe('N33°52.55′ W117°08.25′')
  })
})
