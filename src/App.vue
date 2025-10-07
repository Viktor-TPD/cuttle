<template>
  <v-app id="app">
    <TheHeader v-if="showNav" :variant="variant" class="sticky" />
    <v-main>
      <RouterView />
    </v-main>
    <TheFooter v-if="showFooter" :variant="variant" />
    <BubbleAnimation
      v-if="overlayStore.showBubbles"
      :bubble-count="300"
      :min-size="30"
      :max-size="150"
      :min-speed="1.5"
      :max-speed="2.5"
      :min-delay="0"
      :max-delay="2"
      @finished="overlayStore.finishBubbles"
    />
  </v-app>
</template>

<script>
import { mapStores } from 'pinia';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useGameStore } from '@/stores/game';
import { useAuthStore } from '@/stores/auth';
import { useGameListStore } from '@/stores/gameList';
import { useOverlayStore } from '@/stores/overlay';
import BubbleAnimation from '@/components/BubbleAnimation.vue';

export default {
  components: { TheHeader, TheFooter, BubbleAnimation },
  computed: {
    ...mapStores(useAuthStore, useOverlayStore),
    isAuthenticated() {
      return this.authStore.authenticated;
    },
    isSmallDevice() {
      return this.$vuetify.display.smAndDown;
    },
    variant() {
      const isHomeView = this.$router.currentRoute.value.name !== 'Stats';
      return isHomeView ? 'light' : 'dark';
    },
    showFooter() {
      return this.showNav && this.isSmallDevice && this.isAuthenticated;
    },
  },
  watch: {
    '$route.meta'({ hideNavigation }) {
      this.showNav = !hideNavigation;
    },
  },
  data() {
    return { showNav: false };
  },
  created() {
    if (window.Cypress) {
      window.cuttle.gameStore = useGameStore();
      window.cuttle.authStore = useAuthStore();
      window.cuttle.gameListStore = useGameListStore();
    }
  },
};
</script>

<style lang="scss">
@import '@/sass/typography';

.gradient-text {
  background: linear-gradient(268.89deg, rgba(98, 2, 238, 0.87) 73.76%, rgba(253, 98, 34, 0.87) 99.59%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* v-main applies min-height:100vh to .v-application--wrap; adjust on small screens */
@media (max-width: 600px) {
  div > .v-application--wrap {
    min-height: 100%;
  }
}

.sticky {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 500;
}
</style>
