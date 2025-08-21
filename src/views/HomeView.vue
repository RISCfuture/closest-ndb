<template>
  <no-location-view v-if="showNoLocation" />
  <location-view v-else />
</template>

<script setup lang="ts">
import LocationView from '@/views/LocationView.vue'
import NoLocationView from '@/views/NoLocationView.vue'
import { useNavaidsStore } from '@/stores/navaids'
import { computed, onMounted } from 'vue'

const navaidsStore = useNavaidsStore()

const showNoLocation = computed(() => navaidsStore.locationUnknown || !!navaidsStore.locationError)

onMounted(() => {
  navaidsStore.loadNDBs()
  navaidsStore.setLocation().catch(() => {
    // Error is already handled in the store by setting locationError
    // No need to propagate it further
  })
})
</script>
