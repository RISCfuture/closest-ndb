<template>
  <div class="container full-height">
    <title-view />
    <home-view />
    <footer-view />
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import FooterView from '@/views/FooterView.vue'
  import TitleView from '@/views/TitleView.vue'
  import HomeView from '@/views/HomeView.vue'

  @Options({
    components: { TitleView, FooterView, HomeView },
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
@use 'src/styles/constants';

.container {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: min-content 1fr min-content min-content;
  gap: 1em 1em;
  grid-template-areas:
    "header header header"
    ". adf ."
    ". info ."
    "footer footer footer";
  background-image: url('images/background.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
