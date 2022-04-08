<template>
  <div class="no-location">
    <h2>Simply allow this web page to know your location, and you’ll have your answer.</h2>
    <p>(Don’t make that face. How did you expect this to work if you aren’t willing to give up your
      location?)</p>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/constants';

.no-location {
  grid-area: adf;
  align-self: center;
}

p {
  font-size: constants.$small-size;
  opacity: 35%;
}
</style>
