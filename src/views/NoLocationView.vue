<template>
  <div class="no-location">
    <h2>{{ t('noLocation.header') }}</h2>
    <p>{{ t('noLocation.body') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
@use '@/assets/styles/constants';

.no-location {
  grid-area: adf;
  align-self: center;
}

p {
  font-size: constants.$small-size;
  text-align: center;
  opacity: 0.35;
}
</style>
