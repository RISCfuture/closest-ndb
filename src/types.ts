export interface NDB {
  id: string
  name: string
  lat: number
  lon: number
  freq: string
}

/**
 * The wire format of `ndbs.json`: one array per field, all in the same record order.
 *
 * A few hundred records of identical shape weigh far less as five arrays than as objects
 * repeating the same five keys.
 */
export interface NDBColumns {
  id: string[]
  name: string[]
  lat: number[]
  lon: number[]
  freq: string[]
}

export type Loc = [number, number]
