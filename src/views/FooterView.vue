<template>
  <footer>
    <i18n-t tag="p" keypath="footer">
      <template #me><a href="https://tim.codes">Tim Morgan</a></template>
      <template #github><a href="https://github.com/RISCfuture/closest-ndb">GitHub</a></template>
    </i18n-t>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/constants';

footer {
  grid-area: footer;
  place-self: center stretch;
  padding: 0 1em;

  p {
    font-size: constants.$small-size;
  }
}
</style>
