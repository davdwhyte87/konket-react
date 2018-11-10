import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from '../src/components/Home'
import config from './config'



class App extends Component {
  render() {
    return (
      <div>
        <Home/>
      </div>
    )
  }
}

export default App;
