import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'
import DynaFrmCreator from './components/dynaFrmCreator'
import DynaFrmRender from './components/dynaFrmRender'

class App extends Component {
  constructor() {
    super()
    this.state = {
      form :
      {
        id: 1,
        fields: [
          {
            name: "hairColor",
            caption : "آخرین ریشه رنگ",
            type: "select",
            params: [
              {
                caption: "یک هفته",
                value: "۱هفته"
              },
              {
                caption: "دو هفته",
                value: "۲هفته"
              }
            ]
          }
        ]
      }
    }
  }
  render() {
    return (
      <div className="App">

        <DynaFrmRender
        model={this.state.form.fields}
        />

        <DynaFrmCreator
          id = "1"
        />        
      </div>
    );
  }
}

export default App;
