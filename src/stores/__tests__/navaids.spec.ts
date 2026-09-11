import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { useNavaidsStore } from '../navaids'
import { createTestingPinia } from '@pinia/testing'
import type { Loc, NDB, NDBColumns } from '../../types'

const ca: NDB = {
  id: 'CA',
  lat: 37.655 * 3600,
  lon: -122.36 * 3600,
  name: 'OAKLAND',
  freq: '362',
}

const ny: NDB = {
  id: 'NY',
  lat: 40.77 * 3600,
  lon: -73.87 * 3600,
  name: 'NEW YORK',
  freq: '385',
}

const azLocation: Loc = [33.43, -112.01]

const ndbColumns: NDBColumns = {
  id: [ca.id, ny.id],
  name: [ca.name, ny.name],
  lat: [ca.lat, ny.lat],
  lon: [ca.lon, ny.lon],
  freq: [ca.freq, ny.freq],
}

function stubNDBsResponse(body: unknown, status = 200) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ status, statusText: 'OK', json: () => Promise.resolve(body) }),
  )
}

describe('navaids store', () => {
  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('loadNDBs', () => {
    it('pairs the columns of ndbs.json back into records', async () => {
      createTestingPinia({ createSpy: vi.fn, stubActions: false })
      stubNDBsResponse(ndbColumns)

      const store = useNavaidsStore()
      await store.loadNDBs()

      expect(store.NDBs).toEqual([ca, ny])
    })
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
