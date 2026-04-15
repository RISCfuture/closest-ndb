<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <div class="container full-height">
    <title-view />
    <main id="main-content">
      <home-view />
    </main>
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

.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 1000;
  padding: 0.75em 1em;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  background-color: constants.$ndb-color;
  border: 2px solid #fff;
  border-radius: 0 0 6px;

  &:focus,
  &:focus-visible {
    top: 0;
    outline: 3px solid #fff;
    outline-offset: 2px;
  }
}

#main-content {
  display: contents;
}

.container {
  display: grid;
  grid-template:
    'header header header' min-content
    '. adf .' 1fr
    '. info .' min-content
    'footer footer footer' min-content /
    auto 1fr auto;
  grid-auto-columns: 1fr;
  gap: 1em;
  background-image: url('assets/images/background.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
