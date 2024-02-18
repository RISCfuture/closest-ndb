const en: Record<string, Intl.NumberFormatOptions> = {
  distance: {
    style: 'decimal',
    useGrouping: true,
    maximumFractionDigits: 0
  },
  coordinateDegrees: {
    style: 'decimal',
    maximumFractionDigits: 0
  },
  coordinateMinutes: {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 2
  }
}

export default en
