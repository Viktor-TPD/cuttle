<template>
  <div class="bubble-overlay">
    <div v-for="(style, i) in bubbleStyles" :key="i" class="bubble" :style="style"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  bubbleCount: { type: Number, default: 20 },
  minSize: { type: Number, default: 10 },
  maxSize: { type: Number, default: 80 },
  minSpeed: { type: Number, default: 3 },
  maxSpeed: { type: Number, default: 8 },
  minDelay: { type: Number, default: 0 },
  maxDelay: { type: Number, default: 5 },
});

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const bubbleStyles = computed(() => {
  return Array.from({ length: props.bubbleCount }, () => {
    const left = randomBetween(0, 100);
    const size = randomBetween(props.minSize, props.maxSize);
    const delay = randomBetween(props.minDelay, props.maxDelay);
    const duration = randomBetween(props.minSpeed, props.maxSpeed);

    return {
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    };
  });
});
</script>

<style lang="scss" scoped>
.bubble-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 1000;
}

.bubble {
  position: absolute;
  bottom: -200px;
  background-color: rgba($color: #000000, $alpha: 0.1);
  border: 8px solid white;
  border-radius: 50%;
  animation-name: rise;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-duration: 2s;

  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 25%;
    width: 40%;
    height: 20%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    filter: blur(2px);
  }
}

@keyframes rise {
  from {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(-150vh) scale(0.5);
    opacity: 0.7;
  }
}
</style>
