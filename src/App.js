import React, { Component } from 'react';
import logo from './medical.svg';
import './App.css';
import Form from './Components/form.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Eric's Pharmacy</h1>
        </header>
        < Form />
      </div>
    );
  }
}

export default App;
