<template>
  <BaseDialog
    :id="`create-game-dialog`"
    v-model="show"
    :title="t('home.submitCreateGame')"
    :opacity="1"
    data-cy="create-game-dialog"
  >
    <template #activator>
      <v-btn
        class="px-16 w-100"
        color="newPrimary"
        size="x-large"
        text-color="white"
        data-cy="create-game-btn"
      >
        {{ t('home.openCreateGame') }}
      </v-btn>
    </template>
    <template #body>
      <v-form id="create-game-form" @submit.prevent="submitNewGame">
        <h4>
          {{ t('home.playAiContent') }}
          <a
            class="text-cyan-lighten-2 text-decoration-none"
            href="https://human-ai-interaction.github.io/cuttle-bot/"
            target="_blank"
          >
            {{ t('home.playAiLink') }}
          </a>
          {{ t('home.playAiContent2') }}
        </h4>
        <div class="d-flex align-center">
          <StatsScoringDialog activator-color="surface-2" :show-button-text="false" />
          <v-switch
            v-model="isRanked"
            class="d-flex align-center"
            :label="isRanked ? t('global.ranked') : t('global.casual')"
            data-cy="create-game-ranked-switch"
            color="surface-2"
          />
        </div>
        <v-text-field
          v-model="gameName"
          name="game-name"
          autofocus
          :disabled="loading"
          :label="t('home.gameName')"
          variant="outlined"
          data-cy="game-name-input"
        />

        <v-divider class="my-4" />

        <v-switch
          v-model="timerSettings.enabled"
          :label="timerSettings.enabled ? 'Timer: Enabled' : 'Timer: Disabled'"
          data-cy="timer-enabled-switch"
          color="surface-2"
        />
        <v-expand-transition>
          <div v-if="timerSettings.enabled" class="mt-4">
            <v-radio-group v-model="timerSettings.type" label="Timer Type" data-cy="timer-type-group">
              <v-radio :value="TIMER_TYPES.TURN" label="Turn Timer" data-cy="timer-type-turn">
                <template #label>
                  <div>
                    <strong>Turn Timer</strong>
                    <div class="text-caption ml-2">Each turn gets a fresh countdown</div>
                  </div>
                </template>
              </v-radio>

              <v-radio :value="TIMER_TYPES.CHESS" label="Chess Timer" disabled data-cy="timer-type-chess">
                <template #label>
                  <div>
                    <strong>Chess Timer</strong>
                    <div class="text-caption ml-2">Coming soon! Each player has their own clock</div>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>

            <v-radio-group v-model="timerSettings.duration" label="Duration" data-cy="timer-duration-group">
              <v-radio
                v-for="preset in TIMER_PRESETS"
                :key="preset.key"
                :value="preset.value"
                :data-cy="`timer-preset-${preset.key.toLowerCase()}`"
              >
                <template #label>
                  <div>
                    <strong>{{ preset.label }}</strong>
                    <span class="text-caption ml-2">({{ formatTime(preset.value) }})</span>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </div>
        </v-expand-transition>
      </v-form>
    </template>
    <template #actions>
      <v-btn
        class="mr-2"
        data-cy="cancel-create-game"
        :disabled="loading"
        variant="text"
        color="surface-1"
        @click="cancelCreateGame"
      >
        {{ t('global.cancel') }}
      </v-btn>
      <v-btn
        type="submit"
        data-cy="submit-create-game"
        :loading="loading"
        color="surface-1"
        variant="flat"
        form="create-game-form"
      >
        {{ t('home.submitCreateGame') }}
      </v-btn>
    </template>
  </BaseDialog>
</template>

<script>
import { mapStores } from 'pinia';
import { useGameListStore } from '@/stores/gameList';
import { useI18n } from 'vue-i18n';
import BaseDialog from '@/components/BaseDialog.vue';
import StatsScoringDialog from '@/components/StatsScoringDialog.vue';
import { getLocalStorage, setLocalStorage, LS_PREFERS_RANKED_NAME } from '_/utils/local-storage-utils.js';
import { UseGameTimer } from '_/src/composables/useGameTimer';

export default {
  name: 'CreateGameDialog',
  components: { StatsScoringDialog, BaseDialog },
  emits: ['error'],
  setup() {
    const { t } = useI18n();
    const { TIMER_TYPES, TIMER_PRESETS, getDefaultSettings, formatTime } = UseGameTimer();
    return {
      t,
      TIMER_TYPES,
      TIMER_PRESETS,
      getDefaultSettings,
      formatTime,
    };
  },
  data() {
    return {
      show: false,
      gameName: '',
      loading: false,
      isRanked: false,
      timerSettings: this.getDefaultSettings(),
    };
  },
  computed: {
    ...mapStores(useGameListStore),
  },
  watch: {
    isRanked(isRanked) {
      this.setRankedPreference(isRanked);
    },
  },
  mounted() {
    this.isRanked = this.getRankedPreference();
  },
  methods: {
    submitNewGame() {
      this.loading = true;
      this.gameListStore
        .requestCreateGame({
          gameName: this.gameName,
          isRanked: this.isRanked,
          timerEnabled: this.timerSettings.enabled,
          timerType: this.timerSettings.type,
          timerDuration: this.timerSettings.duration,
        })
        .then((res) => {
          const { gameId } = res;
          this.$router.push(`/lobby/${gameId}`);
        })
        .catch(this.handleError);
    },
    cancelCreateGame() {
      this.gameName = '';
      this.loading = false;
      this.show = false;
      this.timerSettings = this.getDefaultSettings();
    },
    handleError(err) {
      this.$emit('error', err);
      this.cancelCreateGame();
    },
    setRankedPreference(prefersRanked) {
      setLocalStorage(LS_PREFERS_RANKED_NAME, prefersRanked === true);
      this.isRanked = prefersRanked;
    },
    getRankedPreference() {
      return getLocalStorage(LS_PREFERS_RANKED_NAME) === 'true';
    },
  },
};
</script>
