import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useOverlayStore = defineStore('overlay', () => {
  const showBubbles = ref(false);
  const nextRoute = ref(null);

  function triggerBubbles(route) {
    nextRoute.value = route;
    showBubbles.value = true;
  }

  function finishBubbles() {
    showBubbles.value = false;

    if (nextRoute.value) {
      const router = useRouter();
      router.push(nextRoute.value);
      nextRoute.value = null;
    }
  }

  return { showBubbles, triggerBubbles, finishBubbles };
});
