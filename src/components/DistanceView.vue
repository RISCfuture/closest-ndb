<template>
  <div class="distance-readout" data-testid="ndb-distance">
    {{ distanceText }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { isUndefined } from 'lodash-es'

const { t, n } = useI18n()

const props = defineProps<{
  distance?: number
  error?: GeolocationPositionError
}>()

const distanceText = computed(() => {
  if (props.error) return errorText.value
  if (isUndefined(props.distance)) return t('geolocationError.positionUnknown')
  return t('distanceNM', { distance: n(props.distance, 'distance') })
})

const errorText = computed(() => {
  if (!props.error) return ''
  switch (props.error.code) {
    case GeolocationPositionError.POSITION_UNAVAILABLE:
      return t('geolocationError.positionUnknown')
    case GeolocationPositionError.PERMISSION_DENIED:
      return t('geolocationError.permissionDenied')
    case GeolocationPositionError.TIMEOUT:
      return t('geolocationError.positionUnknown')
    default:
      return props.error.message
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/constants';

.distance-readout {
  display: inline-block;
  grid-area: adf;
  place-self: center center;
  padding: 0.5em;
  font-family: Mulish, sans-serif;
  font-size: constants.$med-size;
  font-weight: 700;
  color: constants.$ndb-color;
  background-color: rgba(255 255 255 / 75%);
  border-width: 0.5vmin;

  @include constants.info-plate;
}
</style>
