import { defineStore } from 'pinia'
import type { Loc, NDB } from '@/types'
import { isEmpty, isUndefined, minBy, toString } from 'lodash-es'
import { geoDistance, geoInitialBearing, secondsToDegrees } from '@/util/geo'
import * as Sentry from '@sentry/vue'

export const useNavaidsStore = defineStore('navaids', {
  state: () => ({
    NDBs: [] as NDB[],
    loadError: undefined as Error | undefined,
    location: undefined as Loc | undefined,
    locationError: undefined as GeolocationPositionError | undefined
  }),

  getters: {
    closestNDB: (state) => {
      const { location } = state
      if (isUndefined(location)) return undefined
      return minBy(state.NDBs, (ndb) => geoDistance(location, secondsToDegrees(ndb)))
    },

    bearingToClosestNDB(state): number | undefined {
      const { location } = state
      if (isUndefined(location)) return undefined
      const ndb = this.closestNDB
      if (isUndefined(ndb)) return undefined

      return geoInitialBearing(location, secondsToDegrees(ndb))
    },

    distanceToClosestNDB(state): number | undefined {
      const { location } = state
      if (isUndefined(location)) return undefined
      const ndb = this.closestNDB
      if (isUndefined(ndb)) return undefined

      return geoDistance(location, secondsToDegrees(ndb))
    },

    locationUnknown: (state) => isUndefined(state.location) && isUndefined(state.locationError),

    loading: (state) => isEmpty(state.NDBs) && isUndefined(state.loadError)
  },

  actions: {
    async loadNDBs() {
      this.$patch({ NDBs: [], loadError: undefined })

      try {
        const response = await fetch(`/closest-ndb/ndbs.json`)
        if (response.status !== 200)
          throw new Error(`Unexpected status code ${response.status} ${response.statusText}`)

        this.$patch({ NDBs: await response.json(), loadError: undefined })
      } catch (error: unknown) {
        if (error instanceof Error) this.$patch({ NDBs: [], loadError: error })
        else this.$patch({ NDBs: [], loadError: new Error(toString(error)) })
      }
    },

    setLocation() {
      return new Promise<void>((resolve, reject) => {
        this.$patch({ location: undefined, locationError: undefined })
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.$patch({
              location: [position.coords.latitude, position.coords.longitude],
              locationError: undefined
            })
            Sentry.metrics.count('geolocation_result', 1, { attributes: { outcome: 'success' } })
            resolve()
          },
          (error) => {
            this.$patch({ location: undefined, locationError: error })
            const errorType =
              error.code === GeolocationPositionError.PERMISSION_DENIED
                ? 'permission_denied'
                : error.code === GeolocationPositionError.POSITION_UNAVAILABLE
                  ? 'position_unavailable'
                  : 'timeout'
            Sentry.metrics.count('geolocation_result', 1, {
              attributes: { outcome: 'error', error_type: errorType }
            })
            reject(new Error(error.message))
          }
        )
      })
    }
  }
})
