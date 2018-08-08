import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class DynaFrmRender extends Component {
    constructor(props) {
        super(props)

        let data = this.props.model.map(field=>{return {name : field.name, type: field.type, caption : field.caption, value : ""}})

        this.state = {
            data : data
        }
    }

    handleChange(e,index) {
        let target = e.target
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let data = this.state.data
        data[index] = {
            ...data[index],
            value : value
        }
        this.setState({
            data : data
        })
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.props.onSubmit) this.props.onSubmit(this.state.data)
    }

    renderForm() {
        let model = this.props.model
        let FormUI = model.map((m,index)=>{
            let name = m.name
            let caption = m.caption
            let type = m.type
            let params = m.params || []

            return(
                    <div key={index}>
                        {
                            (type === "text" || type==="textarea" || type==="color" || type==="number" || type==="range") ?
                                (
                                <FormGroup key={name}> 
                                    <label htmlFor={name}>{caption}</label>
                                    <Input onChange={(e)=>this.handleChange(e,index)} value={this.state.data[index].value} id={name} type={type} placeholder={caption} name={name}/>
                                </FormGroup>
                                )
                                : (<div></div>)

                        }
                        {
                            (type==="checkbox") ?
                                (
                                <FormGroup key={name} check>
                                    <label>
                                        <Input onChange={(e)=>this.handleChange(e,index)} value={this.state.data[index].value} type={type} name={name}/>{` ${caption}`}
                                    </label>
                                </FormGroup>
                                )
                                : (<div></div>)

                        }                          
                        {
                            (type === "select") ? (
                                <FormGroup>
                                    <Label for={name}>{caption}</Label>
                                    <select onChange={(e)=>this.handleChange(e,index)} value={this.state.data[index].value} name={name} id={name} className="form-control">
                                    {
                                        params.map((param,index)=> {
                                        return <option key={index} value={param.value}>
                                                {param.caption}
                                            </option>
                                        })
                                    }
                                    </select>
                                </FormGroup>
                                ) : (<div></div>)    
                        }
                        {
                            (type === "radio") ? (
                                <FormGroup tag="fieldset">
                                <legend>{caption}</legend>
                                <div onChange={(e)=>this.handleChange(e,index)}>
                                {
                                    params.map((param,index)=> {
                                       return   <FormGroup key={index} check>
                                                    <Label check>
                                                    <Input type="radio" value={param.value} name={name} />
                                                    {param.caption}
                                                    </Label>
                                                </FormGroup>
                                    })
                                }
                                </div>
                                </FormGroup>
                                ) : (<div></div>)    
                        }
                        {
                            (type === "file") ?
                                (<Input type={type} onChange={(e)=>this.handleChange(e,index)} value={this.state.data[index].value} name={name}/>)
                                : (<div></div>)
                        }                      
                </div>
            )
        })
        return FormUI
    }

    render() {
        let title = this.props.title || "فرم پویا"
        return(
            <div>
                <h3>{title}</h3>
                <Form onSubmit={(e)=>this.onSubmit(e)}>
                    {this.renderForm()}
                    <Button color="secondary">ارسال و ذخیره</Button>
                </Form>
            </div>
        )
    }
}

export default DynaFrmRender