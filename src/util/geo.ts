import type { Loc, NDB } from '@/types'

function deg2rad(x: number) {
  return (x * Math.PI) / 180
}

export function secondsToDegrees(ndb: NDB): Loc {
  return [ndb.lat / 3600, ndb.lon / 3600]
}

export function geoDistance(coords1: Loc, coords2: Loc) {
  const lat1 = coords1[0]
  const lon1 = coords1[1]

  const lat2 = coords2[0]
  const lon2 = coords2[1]

  const R = 6371 // earth radius, km

  const x1 = lat2 - lat1
  const dLat = deg2rad(x1)
  const x2 = lon2 - lon1
  const dLon = deg2rad(x2)

  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.pow(Math.sin(dLon / 2), 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c

  return d * 0.539957 // km to NMi
}

export function geoInitialBearing(origin: Loc, dest: Loc) {
  const lat1 = deg2rad(origin[0])
  const lon1 = deg2rad(origin[1])

  const lat2 = deg2rad(dest[0])
  const lon2 = deg2rad(dest[1])

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2)
  const x =
    Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
  const bearing = Math.atan2(y, x)

  return ((bearing * 180) / Math.PI + 360) % 360 // in degrees
}
