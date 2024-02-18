<template>
  <a-d-f-view :bearing="bearing" :distance="distance" />
  <distance-view v-if="distance || locationError" :distance="distance" :error="locationError" />
  <info-view v-if="ndb" :ndb="ndb" />
</template>

<script setup lang="ts">
import ADFView from '@/components/ADFView.vue'
import DistanceView from '@/components/DistanceView.vue'
import InfoView from '@/components/InfoView.vue'
import { useNavaidsStore } from '@/stores/navaids'
import { computed } from 'vue'

const navaidsStore = useNavaidsStore()

const bearing = computed(() => navaidsStore.bearingToClosestNDB)
const distance = computed(() => navaidsStore.distanceToClosestNDB)
const locationError = computed(() => navaidsStore.locationError)
const ndb = computed(() => navaidsStore.closestNDB)
</script>
