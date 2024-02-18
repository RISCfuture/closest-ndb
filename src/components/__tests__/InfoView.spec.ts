import { describe, it, expect } from 'vitest'
import InfoView from '../InfoView.vue'
import i18n from '../../i18n'
import { render, screen } from '@testing-library/vue'

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

    expect(screen.getByTestId('ndb-name').textContent).toBe('TOPGUN')
    expect(screen.getByTestId('ndb-freq').textContent).toBe('661')
    expect(screen.getByTestId('ndb-id').textContent).toBe('TG')
    expect(screen.getByTestId('ndb-coords').textContent).toBe('N33°52.55′ W117°08.25′')
  })
})
