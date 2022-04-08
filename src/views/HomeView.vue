<template>
  <no-location-view v-if="locationUnknown" />
  <location-view v-else />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Action, Getter } from 'vuex-class';
import TitleView from '@/views/TitleView.vue';
import NoLocationView from '@/views/NoLocationView.vue';
import LocationView from '@/views/LocationView.vue';

@Options({
  components: { LocationView, NoLocationView, TitleView },
})
export default class HomeView extends Vue {
  @Getter locationUnknown!: boolean;

  @Getter bearingToClosestNDB!: number | undefined;

  @Action setLocation!: () => void;

  mounted() {
    this.setLocation();
  }

  get bearing(): number {
    return this.bearingToClosestNDB!;
  }
}
</script>
