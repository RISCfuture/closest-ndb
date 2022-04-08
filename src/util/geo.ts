function deg2rad(x: number): number {
  return (x * Math.PI) / 180;
}

// eslint-disable-next-line import/prefer-default-export
export function geoDistance(coords1: [number, number], coords2: [number, number]): number {
  const lat1 = coords1[0];
  const lon1 = coords1[1];

  const lat2 = coords2[0];
  const lon2 = coords2[1];

  const R = 6371; // earth radius, km

  const x1 = lat2 - lat1;
  const dLat = deg2rad(x1);
  const x2 = lon2 - lon1;
  const dLon = deg2rad(x2);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d * 0.539957; // km to NMi
}

export function geoInitialBearing(origin: [number, number], dest: [number, number]): number {
  const lat1 = origin[0];
  const lon1 = origin[1];

  const lat2 = dest[0];
  const lon2 = dest[1];

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2)
    - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  const bearing = Math.atan2(y, x);

  return ((bearing * 180) / Math.PI + 360) % 360; // in degrees
}
