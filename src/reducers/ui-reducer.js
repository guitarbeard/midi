const initialState = {
  msg: '-',
  note: false,
  frequency: 100
};


export default (state = initialState, action) => {

  const nextState = {...state};

  switch (action.type) {
    case 'START':
      nextState.msg = 'PLAYING';
      nextState.note = action.note;
      nextState.frequency = action.frequency;
      break;

    case 'PLAY':
      nextState.msg = 'PLAYING';
      nextState.note = action.note;
      nextState.frequency = action.frequency;
      break;

    case 'PAUSE':
      nextState.msg = 'PAUSED';
      nextState.note = false;
      nextState.frequency = false;
      break;

    case 'CLOSE':
      nextState.msg = 'AUDIO CONTEXT CLOSED!';
      break;

    default:
      break;
  }

  return nextState;

};
