<template>
  <div class="morse-char">
    {{ normalizedChar }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ char: string }>()
const normalizedChar = computed(() => props.char.toUpperCase())
</script>

<style lang="scss">
@use 'sass:math';
@use '@/assets/styles/constants';

.morse-char {
  display: flex;
  flex-flow: row wrap;
  font-family: Morse, monospace;
  font-size: constants.$small-size;
  line-height: math.div(constants.$small-size, 2);
  color: constants.$ndb-color;
}
</style>
