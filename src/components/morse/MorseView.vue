<template>
  <div class="morse-text">
    <morse-character :char="char" v-for="(char, i) in chars" :key="i" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MorseCharacter from '@/components/morse/MorseCharacter.vue';

class Props {
  text!: string;
}

@Options({
  components: { MorseCharacter },
})
export default class MorseView extends Vue.with(Props) {
  get chars(): string[] {
    return this.text.split('');
  }
}
</script>

<style lang="scss">
.morse-text {
  display: inline-flex;
  flex-flow: column nowrap;
  padding: 0;
  margin: 0;
}
</style>
