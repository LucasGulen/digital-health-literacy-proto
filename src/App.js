import React, { Component } from 'react';
import logoReact from './assets/images/logoReact.svg';
import logoHealth from './assets/images/logoHealth.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logoReact} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <img src={logoHealth}/>
      </div>
    );
  }
}

export default App;
