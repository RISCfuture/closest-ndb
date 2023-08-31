import { ActionContext, Module } from 'vuex'
import { assign, isUndefined, minBy } from 'lodash-es'
import { NDB, RootState } from '@/store/types'
import { geoDistance, geoInitialBearing } from '@/util/geo'
import * as allNDBs from '@/data/ndbs.json'

const defaultState: RootState = {
  NDBs: [],
  location: undefined,
  locationError: undefined,
}

function NDBCoords(ndb: NDB): [number, number] {
  return [ndb.lat / 3600, ndb.lon / 3600]
}

export default function createRootModule(
  initialState: Partial<RootState> = {},
): Module<RootState, RootState> {
  const fullInitialState: RootState = assign({}, defaultState, initialState)
  return {
    state(): RootState {
      return fullInitialState
    },

    getters: {
      closestNDB(state: RootState): NDB | undefined {
        const { location } = state
        if (isUndefined(location)) return undefined
        return minBy(state.NDBs, (ndb: NDB) => geoDistance(location, NDBCoords(ndb)))
      },

      bearingToClosestNDB(state: RootState, getters: {closestNDB: NDB | undefined}):
        number | undefined {
        if (isUndefined(state.location)) return undefined
        const ndb = getters.closestNDB
        if (isUndefined(ndb)) return undefined

        return geoInitialBearing(state.location, NDBCoords(ndb))
      },

      distanceToClosestNDB(state: RootState, getters: {closestNDB: NDB | undefined}):
        number | undefined {
        if (isUndefined(state.location)) return undefined
        const ndb = getters.closestNDB
        if (isUndefined(ndb)) return undefined

        return geoDistance(state.location, NDBCoords(ndb))
      },

      locationUnknown(state: RootState): boolean {
        return isUndefined(state.location) && isUndefined(state.locationError)
      },

      locationError(state: RootState): GeolocationPositionError | undefined {
        return state.locationError
      },
    },

    mutations: {
      setNDBs(state: RootState, { NDBs }: { NDBs: NDB[] }): void {
        state.NDBs = NDBs
      },

      resetLocation(state: RootState): void {
        state.location = undefined
        state.locationError = undefined
      },

      setLocation(state: RootState, { coords }: { coords: [number, number] }): void {
        state.location = coords
      },

      setLocationError(state: RootState, { error }: { error: GeolocationPositionError }): void {
        state.locationError = error
      },
    },

    actions: {
      loadNDBs({ commit }: ActionContext<RootState, RootState>): void {
        commit('setNDBs', { NDBs: allNDBs })
      },

      setLocation({ commit }: ActionContext<RootState, RootState>): Promise<void> {
        return new Promise<void>((resolve, reject) => {
          commit('resetLocation')
          navigator.geolocation.getCurrentPosition((pos) => {
            const coords = [pos.coords.latitude, pos.coords.longitude]
            commit('setLocation', { coords })
            resolve()
          }, (error) => {
            commit('setLocationError', { error })
            reject(new Error(error.message))
          })
        })
      },
    },
  }
}
