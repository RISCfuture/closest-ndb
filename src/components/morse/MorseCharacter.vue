<template>
  <div class="morse-char">{{normalizedChar}}</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

class Props {
  char!: string;
}

export default class MorseCharacter extends Vue.with(Props) {
  private get normalizedChar(): string {
    return this.char[0].toUpperCase();
  }
}
</script>

<style lang="scss">
@use 'src/styles/constants';

.morse-char {
  display: flex;
  flex-flow: row wrap;
  font-family: 'Morse', monospace;
  color: constants.$ndb-color;
  font-size: constants.$small-size;
  line-height: constants.$small-size / 2;
}
</style>
