export const playUI = (note, frequency) => ({
  type: 'PLAY',
  note,
  frequency
});

export const pauseUI = () => ({
  type: 'PAUSE'
});

export const setOsc = (oscillator) => ({
  type: 'START',
  oscillator
});

export const getStore = () => ({
  type: 'GET'
});
