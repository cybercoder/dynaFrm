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
            name: "hairFile",
            caption : "آخرین ریشه رنگ",
            type: "file",
          },          
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
          },
          {
            name: "hairColor1",
            caption : "آخرین ریشه رنگ",
            type: "checkbox",
          },
          {
            name: "hairColor2",
            caption : "آخرین ریشه رنگ",
            type: "textarea",
          },          

          {
            name: "hairColor3",
            caption : "آخرین ریشه رنگ",
            type: "radio",
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
          },
          {
            name: "file1",
            caption : "تصویر ارسالی شما",
            type: "number",
          },
          {
            name: "fxle1",
            caption : "تصویر ارسالی شما",
            type: "range",
          },
          {
            name: "color1",
            caption : "رنگ",
            type: "color",
          }          
        ]
      }
    }
  }
  onSubmit(model) {
    alert(JSON.stringify(model,null,2))
  }
  render() {
    return (
      <div className="App">

        <DynaFrmRender
        model={this.state.form.fields}
        onSubmit={(model)=>this.onSubmit(model)}
        />

        {/* <DynaFrmCreator
          id = "1"
        />         */}
      </div>
    );
  }
}

export default App;
