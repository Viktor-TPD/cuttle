<template>
  <v-btn 
    id="rules-button" 
    icon 
    variant="text" 
    aria-label="Show Rules" 
    title="Show Rules" 
    @click="showDialog = true"
  >
    <v-icon color="neutral-lighten-2" icon="mdi-information" aria-hidden="true" />
    
    <RulesDialog v-model="showDialog" @close="showDialog = false" />
  </v-btn>
</template>

<script setup>
import { ref } from 'vue';
import RulesDialog from './dialogs/components/RulesDialog.vue';

const showDialog = ref(false);
</script>

<style lang="scss" scoped>
/* No styles needed, but keeping the section for consistency */
</style>