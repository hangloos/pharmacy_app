import React, { Component } from 'react';
import logo from './medical.svg';
import './App.css';
import Form from './Components/form.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {

  constructor(props)  {
    super(props);
    this.state = {
      pharmacies: [],
      latitude: '',
      longitude: ''
    }
  }

  componentWillMount() {
    var latitude = ''
    var longitude = ''
    navigator.geolocation.getCurrentPosition(function(position) {
               latitude = position.coords.latitude
               longitude = position.coords.longitude

    })

    setTimeout(() => {
      this.setState({
        latitude: latitude,
        longitude: longitude
      })
    },5000)
   
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Eric's Pharmacy</h1>
        </header>
        < Form latitude={this.state.latitude} longitude={this.state.longitude} />
      </div>
    );
  }
}

export default App;
