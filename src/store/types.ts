export interface NDB {
  id: string
  name: string
  lat: number
  lon: number
  freq: string
}

export interface RootState {
  NDBs: NDB[],
  location?: [number, number],
  locationError?: GeolocationPositionError
}
