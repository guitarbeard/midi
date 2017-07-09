import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from 'react-redux-webaudio';
import Input from './input';

import { playUI, pauseUI, setOsc, getStore } from '../actions';

let closed   = false,
    oscCount = 0;

const Comp = (props) => {

  let { msg, note, frequency } = props.uiReducer;

  return (
    <div className="main">
      <Input handlePlay={props.play} handlePause={props.pause}/>
      <div className="title">
        <h1>{ msg } {note} {frequency}</h1>
      </div>
    </div>
  );
};

const emit = actionCreators.emit;

export default connect(
  state => ({...state}),
  dispatch => ({
    start: (note, frequency) => {
      dispatch( playUI(note, frequency) );
      //dispatch( emit( start ) );
    },
    play: (note, frequency) => {
      dispatch( playUI(note, frequency) );
      //dispatch( emit( play ) );
    },
    pause: () => {
      dispatch( pauseUI() );
      //dispatch( emit( pause ) );
    }
  })
)(Comp);
