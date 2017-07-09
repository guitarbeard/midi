import React, { Component } from 'react';
import { RRWAEngine }  from 'react-redux-webaudio';
import RRWAExamplesApp from './components';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RRWAEngine />
        <RRWAExamplesApp />
      </div>
    );
  }
}

export default App;
