<template>
  <footer>
    <p>This very useful website was written by <a href="https://tim.codes">Tim Morgan</a> following
      a luminous flash of inspiration. (Actually, it mostly exists just so I can watch the number go
      up as more and more NDBs are decommissioned.) Source code on
      <a href="https://github.com/RISCfuture/closest-ndb">GitHub</a>.</p>
  </footer>
</template>

<style scoped lang="scss">
@use '../styles/constants';

footer {
  justify-self: stretch;
  align-self: center;
  grid-area: footer;
  padding: 0 1em;

  p {
    font-size: constants.$small-size;
  }
}
</style>
