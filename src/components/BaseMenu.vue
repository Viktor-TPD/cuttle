<template>
  <v-menu
    v-model="internalShow"
    v-bind="$attrs"
  >
    <template #activator="{ props }">
      <slot name="activator" :props="props" />
    </template>

    <v-list
      bg-color="surface-2"
      base-color="surface-1"
      v-bind="listProps"
    >
      <slot />
    </v-list>
  </v-menu>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  listProps: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue']);

const internalShow = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', value);
    }
  }
});
</script>