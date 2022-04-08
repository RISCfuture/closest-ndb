<template>
  <div class="info-view">
    <div class="name">{{ndb.name}}</div>
    <div class="info-line">
      <div>{{ndb.freq}}</div>
      <div>{{ndb.id}}</div>
      <morse-view :text="ndb.id" />
    </div>
    <div class="lat-lon">{{latLonText}}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { NDB } from '@/store/types';
import MorseView from '@/components/morse/MorseView.vue';

class Props {
  ndb!: NDB;
}

@Options({
  components: { MorseView },
})
export default class InfoView extends Vue.with(Props) {
  declare ndb: NDB;

  private degFormatter = Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  });

  private minFormatter = Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 2,
  });

  get latLonText(): string {
    const latDeg = Math.abs(this.ndb.lat) / 3600;
    const lonDeg = Math.abs(this.ndb.lon) / 3600;
    const latMin = (Math.abs(this.ndb.lat) % 3600) / 60;
    const lonMin = (Math.abs(this.ndb.lon) % 3600) / 60;
    const latSign = this.ndb.lat > 0 ? 'N' : 'S';
    const lonSign = this.ndb.lon > 0 ? 'E' : 'W';

    const latDegText = this.degFormatter.format(latDeg);
    const lonDegText = this.degFormatter.format(lonDeg);
    const latMinText = this.minFormatter.format(latMin);
    const lonMinText = this.minFormatter.format(lonMin);

    return `${latSign}${latDegText}°${latMinText}′ ${lonSign}${lonDegText}°${lonMinText}′`;
  }
}
</script>

<style scoped lang="scss">
@use 'src/styles/constants';

.info-view {
  @include constants.info-plate;

  justify-self: center;
  align-self: center;
  grid-area: info;
  padding: 1vmin 1vmin;
  font-family: Mulish, sans-serif;
  font-size: constants.$small-size;
  color: constants.$ndb-color;

  >* {
    padding-top: 1pt;
    padding-bottom: 1pt;
  }
}

.name {
  text-align: center;
}

.info-line {
  font-size: constants.$med-size;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  * {
    margin: 0 0.125em;
  }
}

.lat-lon {
  font-size: constants.$tiny-size;
  font-style: italic;
}
</style>
