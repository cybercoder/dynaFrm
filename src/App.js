import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'
import DynaFrmCreator from './components/dynaFrmCreator'
class App extends Component {
  render() {
    return (
      <div className="App">
        <DynaFrmCreator
          id = "1"
        />
      </div>
    );
  }
}

export default App;
