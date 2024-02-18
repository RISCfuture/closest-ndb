import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useNavaidsStore } from '../navaids'
import { createTestingPinia } from '@pinia/testing'
import type { Loc, NDB } from '../../types'

const ca: NDB = {
  id: 'CA',
  lat: 37.655 * 3600,
  lon: -122.36 * 3600,
  name: 'OAKLAND',
  freq: '362'
}

const ny: NDB = {
  id: 'NY',
  lat: 40.77 * 3600,
  lon: -73.87 * 3600,
  name: 'NEW YORK',
  freq: '385'
}

const azLocation: Loc = [33.43, -112.01]

describe('navaids store', () => {
  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
  })

  describe('closestNDB', () => {
    it('returns the closest NDB', () => {
      const store = useNavaidsStore()
      store.$patch({ NDBs: [ca, ny], location: azLocation })
      expect(store.closestNDB).toEqual(ca)
    })
  })

  describe('bearingToClosestNDB', () => {
    it('returns the bearing to the closest NDB', () => {
      const store = useNavaidsStore()
      store.$patch({ NDBs: [ca, ny], location: azLocation })
      expect(store.bearingToClosestNDB).toBeCloseTo(299.6, 1)
    })
  })

  describe('distanceToClosestNDB', () => {
    it('returns the distance to the closest NDB', () => {
      const store = useNavaidsStore()
      store.$patch({ NDBs: [ca, ny], location: azLocation })
      expect(store.distanceToClosestNDB).toBeCloseTo(565.2, 1)
    })
  })
})
