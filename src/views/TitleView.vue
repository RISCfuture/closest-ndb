<template>
  <header>
    <h1>Where’s the closest NDB to me right now?</h1>
    <p class="subtitle">Don’t worry, we can help.</p>
  </header>
</template>

<style scoped lang="scss">
@use '../styles/constants';

header {
  justify-self: stretch;
  align-self: center;
  grid-area: header;
  padding: 0 1em;
}

h1 {
  margin-bottom: 0;
  line-height: constants.$large-size;
}

.subtitle {
  text-align: center;
  font-size: constants.$med-size;
  margin: 6pt;
}
</style>
