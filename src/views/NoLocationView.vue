<template>
  <div class="no-location">
    <h2 v-if="!locationError">{{ t('noLocation.header') }}</h2>
    <h2 v-else-if="isPermissionDenied">{{ t('noLocation.permissionDeniedHeader') }}</h2>
    <h2 v-else>{{ t('noLocation.errorHeader') }}</h2>

    <p v-if="!locationError">{{ t('noLocation.body') }}</p>
    <p v-else-if="isPermissionDenied">{{ t('noLocation.permissionDeniedBody') }}</p>
    <p v-else>{{ locationError.message }}</p>

    <button
      v-if="locationError"
      class="retry-button"
      :disabled="isRetrying"
      :aria-label="t('noLocation.retryButton')"
      :aria-busy="isRetrying"
      @click="retryLocation"
    >
      {{
        isRetrying
          ? t('noLocation.retrying')
          : retryCount > 0
            ? t('noLocation.stillNotWorking')
            : t('noLocation.retryButton')
      }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useNavaidsStore } from '@/stores/navaids'
import { computed, ref } from 'vue'

const { t } = useI18n()
const navaidsStore = useNavaidsStore()
const isRetrying = ref(false)
const retryCount = ref(0)

const locationError = computed(() => navaidsStore.locationError)
const isPermissionDenied = computed(
  () => locationError.value?.code === GeolocationPositionError.PERMISSION_DENIED,
)

const retryLocation = async () => {
  if (isRetrying.value) return

  isRetrying.value = true

  try {
    await navaidsStore.setLocation()
    // Reset count on success
    retryCount.value = 0
  } catch (error) {
    // Increment retry count on failure
    retryCount.value++
    console.log('Location retry failed:', error)
  } finally {
    isRetrying.value = false
  }
}
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '@/assets/styles/constants';

.no-location {
  grid-area: adf;
  align-self: center;
  text-align: center;
}

p {
  margin-bottom: 1rem;
  font-size: constants.$small-size;
  text-align: center;
  opacity: 0.35;
}

.retry-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
  background-color: constants.$ndb-color;
  border: none;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: color.adjust(constants.$ndb-color, $lightness: -10%);
    box-shadow: 0 4px 8px rgb(0 0 0 / 15%);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    transform: translateY(0);
  }
}
</style>
