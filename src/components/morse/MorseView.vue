<template>
  <div class="morse-text">
    <morse-character v-for="(char, i) in chars" :key="i" :char="char" />
  </div>
</template>

<script setup lang="ts">
import MorseCharacter from '@/components/morse/MorseCharacter.vue'
import { computed } from 'vue'

const props = defineProps<{ text: string }>()
const chars = computed(() => props.text.split(''))
</script>

<style lang="scss">
.morse-text {
  display: inline-flex;
  flex-flow: column nowrap;
  padding: 0;
  margin: 0;
}
</style>
