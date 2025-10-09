<script setup>
import { ref, computed, watch } from 'vue';

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

const internalState = ref(false);

const menuState = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : internalState.value,
  set: (value) => {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', value);
    } else {
      internalState.value = value;
    }
  }
});
</script>