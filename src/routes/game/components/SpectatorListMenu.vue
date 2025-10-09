<template>
  <BaseMenu v-model="spectatingMenu">
    <template #activator="{ props }">
      <v-btn
        id="spectating-menu-activator"
        data-cy="spectate-list-button"
        class="pl-2"
        v-bind="props"
        icon
        variant="text"
        aria-label="View current spectators"
        title="View current spectators"
      >
        <v-icon class="mr-1" icon="mdi-eye-outline" size="large" aria-hidden="true" />
      </v-btn>
    </template>

    <v-list-item-title v-if="spectatingUsers.length > 0" class="pl-2 pr-2">
      {{ `${t('game.menus.spectatorListMenu.spectators')}` }}
    </v-list-item-title>
    <v-list-item-title v-else class="pl-2 pr-2">
      {{ `${t('game.menus.spectatorListMenu.noSpectators')}` }}
    </v-list-item-title>
    <v-list-item v-for="spectator in spectatingUsers" :key="spectator">
      {{ spectator }}
    </v-list-item>
  </BaseMenu>
</template>

<script>
import { useI18n } from 'vue-i18n';
import BaseMenu from '@/components/BaseMenu.vue';

export default {
  name: 'SpectatorListMenu',
  components: {
    BaseMenu,
  },
  props: {
    spectatingUsers: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return { spectatingMenu: false };
  },
};
</script>