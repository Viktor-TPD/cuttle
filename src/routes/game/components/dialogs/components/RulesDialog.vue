<template>
  <v-dialog
    :model-value="modelValue"
    max-width="1250"
    :persistent="false"
    scrollable
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card id="rulesDialog" class="bg-surface-1">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">Rules</span>
        <v-btn
          icon
          aria-label="Close rules dialog"
          color="surface-2"
          @click="$emit('close')"
        >
          <v-icon icon="mdi-close" size="large" aria-hidden="true" />
        </v-btn>
      </v-card-title>

      <v-card-text>
        <RulesView :is-in-modal="true" parent-modal-id="#rulesDialog" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" color="surface-1" @click="$emit('close')">
          Got It!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

// Lazy load RulesView to avoid circular dependency issues
const RulesView = defineAsyncComponent(() => 
  import('@/routes/rules/RulesView.vue')
);

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue', 'close']);
</script>

<style lang="scss" scoped>
.rules-button {
  width: 100%;
}
</style>