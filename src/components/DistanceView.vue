<template>
  <div class="distance-readout">
    {{ distanceText }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { isUndefined } from 'lodash-es';

class Props {
  distance!: number;

  error?: GeolocationPositionError;
}

@Options({})
export default class DistanceView extends Vue.with(Props) {
  private formatter = Intl.NumberFormat(undefined, {
    useGrouping: true,
    maximumFractionDigits: 0,
  });

  get distanceText(): string {
    if (!isUndefined(this.error)) return this.errorText;
    return `${this.formatter.format(this.distance)} NM`;
  }

  private get errorText(): string {
    if (isUndefined(this.error)) return '';
    switch (this.error?.code) {
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        return '???';
      case GeolocationPositionError.PERMISSION_DENIED:
        return 'Location permission denied :(';
      case GeolocationPositionError.TIMEOUT:
        return '???';
      default:
        return this.error.message;
    }
  }
}
</script>

<style scoped lang="scss">
@use 'src/styles/constants';

.distance-readout {
  @include constants.info-plate;

  justify-self: center;
  align-self: center;
  grid-area: adf;
  display: inline-block;
  padding: 0.5em;
  background-color: rgba(255 255 255 / 75%);
  border-width: 0.5vmin;
  font-family: 'Mulish', sans-serif;
  font-size: constants.$med-size;
  font-weight: 700;
  color: constants.$ndb-color;
}
</style>
