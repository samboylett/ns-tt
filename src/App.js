import React, { Component } from 'react';
import './App.css';
import Steps from './Steps';
import Step from './Step';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Submit your CV</h1>
        </header>
        <p className="App-intro">
          <Steps>
            <Step>1</Step>
            <Step>2</Step>
          </Steps>
        </p>
      </div>
    );
  }
}

export default App;
