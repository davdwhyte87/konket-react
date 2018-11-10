import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from '../src/components/Home'
import config from './config'
import {BrowserRouter,Route} from 'react-router-dom'
import Root from '../src/components/Root'
import Signup from '../src/components/Signup'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Root>
          <Route exact path="/" component={Home}/>
          <Route path="/signup" component={Signup}/>
        </Root>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
