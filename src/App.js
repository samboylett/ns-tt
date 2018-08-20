import React, { Component } from 'react';
import './App.css';
import './Steps';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Submit your CV</h1>
        </header>
        <p className="App-intro">
          <Steps>
          </Steps>
        </p>
      </div>
    );
  }
}

export default App;
