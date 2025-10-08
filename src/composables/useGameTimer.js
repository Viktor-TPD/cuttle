export const TIMER_TYPES = {
  TURN: 'turn',
  CHESS: 'chess',
};

export const TIMER_PRESETS = [
  { label: 'Blitz', value: 30, key: 'BLITZ' },
  { label: 'Fast', value: 60, key: 'FAST' },
  { label: 'Standard', value: 90, key: 'STANDARD' },
  { label: 'Turtle', value: 180, key: 'TURTLE' },
];

export function UseGameTimer() {
  const getDefaultSettings = () => ({
    enabled: false,
    type: TIMER_TYPES.TURN,
    duration: TIMER_PRESETS[2].value,
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    TIMER_TYPES,
    TIMER_PRESETS,
    getDefaultSettings,
    formatTime,
  };
}
