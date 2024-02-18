<template>
  <header>
    <h1>{{ t('title.header') }}</h1>
    <p class="subtitle">{{ t('title.body') }}</p>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
@use '@/assets/styles/constants';

header {
  grid-area: header;
  place-self: center stretch;
  padding: 0 1em;
}

h1 {
  margin-bottom: 0;
  line-height: constants.$large-size;
}

.subtitle {
  margin: 6pt;
  font-size: constants.$med-size;
  text-align: center;
}
</style>
