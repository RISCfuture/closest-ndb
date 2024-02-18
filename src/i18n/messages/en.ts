import type { LocaleMessage } from '@intlify/core-base'

const en: LocaleMessage = {
  coordinate: '{latSign}{latDeg}°{latMin}′ {lonSign}{lonDeg}°{lonMin}′',
  distanceNM: '{distance} NM',
  footer:
    'This very useful website was written by {me} following a luminous ' +
    'flash of inspiration. (Actually, it mostly exists just so I can watch the ' +
    'number go up as more and more NDBs are decommissioned.) Source code on ' +
    '{github}.',
  geolocationError: {
    positionUnknown: '???',
    permissionDenied: 'Location permission denied :('
  },
  noLocation: {
    header: 'Simply allow this web page to know your location, and you’ll have ' + 'your answer.',
    body:
      '(Don’t make that face. How did you expect this to work if you aren’t ' +
      'willing to give up your location?)'
  },
  title: {
    header: 'Where’s the closest NDB to me right now?',
    body: 'Don’t worry, we can help.'
  }
}

export default en
