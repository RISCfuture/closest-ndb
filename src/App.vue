<template>
  <div class="container full-height">
    <title-view />
    <home-view />
    <footer-view />
  </div>
</template>

<script setup lang="ts">
import TitleView from '@/views/TitleView.vue'
import HomeView from '@/views/HomeView.vue'
import FooterView from '@/views/FooterView.vue'
</script>

<style lang="scss">
@use '@/assets/styles/constants';

.container {
  display: grid;
  grid-template:
    'header header header' min-content
    '. adf .' 1fr
    '. info .' min-content
    'footer footer footer' min-content /
    auto 1fr auto;
  grid-auto-columns: 1fr;
  gap: 1em 1em;
  background-image: url('assets/images/background.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
