import React, { Component } from 'react';
import WebMidi from 'webmidi';

function _mtof(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

class Input extends Component {

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.playNote = this.playNote.bind(this);
    this.stopNote = this.stopNote.bind(this);
    this.loadInput = this.loadInput.bind(this);
    this.loadAudio = this.loadAudio.bind(this);
    this.changeControl = this.changeControl.bind(this);

    this.state = {
      hasCtx: false,
      volume: 0.8
    };
  }

  playNote(e) {
    let frequency = _mtof(e.note.number);
    this.props.handlePlay(e.note.name, frequency);
    // Make noise, sweet noise
    this.oscillator.frequency.value = frequency; // value in hertz
    if(this.state.hasCtx) {
      this.audioCtx.resume();
    } else {
      this.oscillator.start(0);
      this.setState({ hasCtx: true });
    }
    this.gainNode.gain.value = this.state.volume;
  }

  stopNote(e) {
    console.log(e);
    this.props.handlePause();
    this.audioCtx.suspend();
  }

  changeControl(e) {
    console.log(e);
    if(e.controller.name === "volumecoarse") {
      let volume = e.value / 100;
      this.gainNode.gain.value = volume;
      this.setState({ volume });
    }
  }

  loadInput(err) {
    if (err) {
      console.log("WebMidi could not be enabled.", err);
    }

    // Retrieve an input by index
    this.input = WebMidi.inputs[0];

    console.log(this.input.state);
    // Listen for a 'note on' message on all channels
    this.input.addListener('noteon', "all", this.playNote);

    // Listen for a 'note off' message on all channels
    this.input.addListener('noteoff', "all", this.stopNote);

    // Listen to control change message on all channels
    this.input.addListener('controlchange', "all", this.changeControl);
  }

  loadAudio() {
    // create web audio api context
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    // create Oscillator and gain node
    this.oscillator = this.audioCtx.createOscillator();
    this.gainNode = this.audioCtx.createGain();

    // connect oscillator to gain node to speakers

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);

    //set options
    this.oscillator.detune.value = 100; // value in cents
  }

  componentDidMount() {
    WebMidi.enable((err) => this.loadInput(err));
    this.loadAudio();
  }

  componentWillUnmount() {
    // Remove all listeners on the input
    this.input.removeListener();
  }

  render() {
    return (
      <div className="Input"></div>
    );
  }
}

export default Input;
