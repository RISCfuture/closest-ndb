<template>
  <adf-view :bearing="bearing" :distance="distance" />
  <distance-view :distance="distance" :error="locationError" />
  <info-view :ndb="closestNDB" v-if="closestNDB" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Getter } from 'vuex-class';
import DistanceView from '@/components/DistanceView.vue';
import ADFView from '@/components/ADFView.vue';
import InfoView from '@/components/InfoView.vue';
import { NDB } from '@/store/types';

@Options({
  components: {
    InfoView,
    DistanceView,
    'adf-view': ADFView,
  },
})
export default class LocationView extends Vue {
  @Getter closestNDB!: NDB | undefined;

  @Getter bearingToClosestNDB!: number | undefined;

  @Getter distanceToClosestNDB!: number | undefined;

  @Getter locationError!: GeolocationPositionError;

  get bearing(): number {
    return this.bearingToClosestNDB!;
  }

  get distance(): number {
    return this.distanceToClosestNDB!;
  }

  get ndb(): NDB {
    return this.closestNDB!;
  }
}
</script>
