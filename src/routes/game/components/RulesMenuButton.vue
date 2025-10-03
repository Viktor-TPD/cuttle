<template>
  <div>
    <v-btn id="rules-button" icon variant="text" aria-label="Show Rules" title="Show Rules" @click="openDialog">
      <v-icon color="neutral-lighten-2" icon="mdi-information" aria-hidden="true"></v-icon>

      <RulesDialog v-model="showDialog" @open="onOpen" @close="onClose"></RulesDialog>
    </v-btn>
  </div>
</template>

<script>
import RulesDialog from './dialogs/components/RulesDialog.vue';

export default {
  name: 'RulesButton',
  components: { RulesDialog },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    onOpen() {
      this.$emit('open');
    },
    onClose() {
      this.showDialog = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped></style>
