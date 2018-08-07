import React, { Component } from 'react'
import { Button,Table, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class DynaFrmRender extends Component {
    constructor() {
        super()

        this.state = {
        
        }
    }

    renderForm() {
        let model = this.props.model
        let FormUI = model.map(m=>{
            let name = m.name
            let caption = m.caption
            let type = m.type
            let params = m.params || []

            return(
                <FormGroup key={name}>
                    <label htmlFor={m.key}>{m.caption}</label>
                    
                        {
                            (m.type === "text") ?
                                (<Input type={m.type} placeholder={m.caption} name={m.name}/>)
                                : (<div></div>)

                        }
                        {
                            (m.type === "select") ? (
                                <select placeholder={m.caption} name={m.name}>
                                {
                                    m.params.map((param,index)=> {
                                       return <option key={index} value={param.value}>
                                            {param.caption}
                                        </option>
                                    })
                                }
                                </select>
                                ) : (<div></div>)    
                        }
                        {
                            (m.type === "radio") ? (
                                <div>
                                <legend>{m.caption}</legend>
                                {
                                    m.params.map((param,index)=> {
                                       return   <FormGroup check>
                                                    <Label check>
                                                    <Input type="radio" name={m.name} />
                                                    {param.caption}
                                                    </Label>
                                                </FormGroup>
                                    })
                                }
                                </div>
                                ) : (<div></div>)    
                        }
                        {
                            (m.type === "file") ?
                                (<Input type={m.type} name={m.name}/>)
                                : (<div></div>)

                        }                      
                </FormGroup>
            )
        })
        return FormUI
    }

    render() {
        let title = this.props.title || "Dynamic form"
        return(
            <div>
                <pre align="left">{JSON.stringify(this.props.model,null, 2)}</pre>

                <h3>{title}</h3>
                <Form>
                    {this.renderForm()}
                </Form>
            </div>
        )
    }
}

export default DynaFrmRender