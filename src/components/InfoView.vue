<template>
  <div class="info-view">
    <div class="name" data-testid="ndb-name">
      {{ ndb.name }}
    </div>
    <div class="info-line">
      <div data-testid="ndb-freq">{{ ndb.freq }}</div>
      <div data-testid="ndb-id">{{ ndb.id }}</div>
      <morse-view :text="ndb.id" />
    </div>
    <div class="lat-lon" data-testid="ndb-coords">
      {{ latLonText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NDB } from '@/types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MorseView from '@/components/morse/MorseView.vue'

const { t, n } = useI18n()

const props = defineProps<{ ndb: NDB }>()

const latLonText = computed(() => {
  const latDeg = Math.abs(props.ndb.lat) / 3600
  const lonDeg = Math.abs(props.ndb.lon) / 3600
  const latMin = (Math.abs(props.ndb.lat) % 3600) / 60
  const lonMin = (Math.abs(props.ndb.lon) % 3600) / 60
  const latSign = props.ndb.lat > 0 ? 'N' : 'S'
  const lonSign = props.ndb.lon > 0 ? 'E' : 'W'

  const latDegText = n(latDeg, 'coordinateDegrees')
  const lonDegText = n(lonDeg, 'coordinateDegrees')
  const latMinText = n(latMin, 'coordinateMinutes')
  const lonMinText = n(lonMin, 'coordinateMinutes')

  return t('coordinate', {
    latDeg: latDegText,
    latSign,
    lonDeg: lonDegText,
    lonSign,
    latMin: latMinText,
    lonMin: lonMinText
  })
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/constants';

.info-view {
  @include constants.info-plate;

  grid-area: info;
  place-self: center center;
  padding: 1vmin;
  font-family: Mulish, sans-serif;
  font-size: constants.$small-size;
  color: constants.$ndb-color;

  > * {
    padding-top: 1pt;
    padding-bottom: 1pt;
  }
}

.name {
  text-align: center;
}

.info-line {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  font-size: constants.$med-size;

  * {
    margin: 0 0.125em;
  }
}

.lat-lon {
  font-size: constants.$tiny-size;
  font-style: italic;
}
</style>
