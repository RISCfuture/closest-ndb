<template>
  <no-location-view v-if="locationUnknown" />
  <location-view v-else />
</template>

<script setup lang="ts">
import LocationView from '@/views/LocationView.vue'
import NoLocationView from '@/views/NoLocationView.vue'
import { useNavaidsStore } from '@/stores/navaids'
import { computed, onMounted } from 'vue'

const navaidsStore = useNavaidsStore()

const locationUnknown = computed(() => navaidsStore.locationUnknown)

onMounted(() => {
  navaidsStore.loadNDBs()
  navaidsStore.setLocation()
})
</script>
