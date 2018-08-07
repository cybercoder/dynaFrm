import React, { Component } from 'react'
import { Button,Table, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DynaFrmCreator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form :
                {
                    id : this.props.id,
                    fields : [{
                        name : '',
                        caption : '',
                        type : 'text',
                        params : []
                    }]
                },
            currentFieldIndex : 0,
            modal: false,
            params : [],
            saved : false
        }

        this.addField = this.addField.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteField = this.deleteField.bind(this)
        this.toggle = this.toggle.bind(this)
        this.addParamRow=this.addParamRow.bind(this)
        this.deleteParamRow = this.deleteParamRow.bind(this)
    }

    addParams(index) {
        let field = this.state.form.fields.filter((field,idx)=>idx===index)
        this.setState({
            params : field[0].params,
            currentFieldIndex : index
        },()=>this.toggle())
    }

    cancel() {
        this.setState({
            params : [],
            modal : false
        })
    }

    addParamRow() {
        let params = this.state.params.slice()
        params.push({})
        this.setState({
            params : params
        })
    }

    deleteParamRow(row) {
        this.setState({
            params : this.state.params.filter((param,index)=>row!==index)
        })
    }

    toggle(){
        this.setState({
          modal: !this.state.modal
        })
    }

    addField() {
        let fields = this.state.form.fields
        fields.push({
            name : '',
            caption : '',
            type : '',
            params : []
        })
        this.setState({
            form : {
                ...this.state.form,
                fields : fields
            }
        })
    }

    deleteField(row) {
        let fields = this.state.form.fields.filter((field,index)=>index!==row)
        this.setState({
            form : {
                ...this.state.form,
                fields : fields
            }
        })

    }

    handleChange(index,event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;



        let fields = this.state.form.fields

        fields[index] = {
            ...fields[index],
            [name] : value
        }

        this.setState(
            {
                form : {
                    ...this.state.form,
                    fields : fields
                }
            }
        )
    }

    handleParamChange(index,event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        let params = this.state.params
        params[index][name] = value
        console.log(params[index])


        this.setState({
            params : params
        })

    }
    handleParamsSave(e) {
        e.preventDefault()
        let fields = this.state.form.fields
        let index = this.state.currentFieldIndex
        fields[index].params = this.state.params
        this.setState({
            form : {
                ...this.state.form,
                fields : fields
            },
            modal: false
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({
            saved : true
        })
    }

    render() {
        return(
            <div>
                <form onSubmit={(e)=>this.onSubmit(e)}>
                <Table>
                    <thead>
                        <th>#</th>
                        <th>name</th>
                        <th>caption</th>
                        <th>type</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {
                        this.state.form.fields.map((field,index)=>{
                            return  <tr key={index}>
                                <td>{index+1}</td>
                                <td><Input required type="text" name="name" onChange={this.handleChange.bind(this,index)} value={this.state.form.fields[index].name}/></td>
                                <td><Input required type="text" name="caption" onChange={this.handleChange.bind(this,index)} value={this.state.form.fields[index].caption}/></td>
                                <td>
                                    <Input type="select" name="type" onChange={this.handleChange.bind(this,index)} value={this.state.form.fields[index].type}>
                                        <option value="text">STRING</option>
                                        <option value="textarea">TEXT</option>
                                        <option value="text">Number</option>
                                        <option value="file">File</option>
                                        <option value="select">SELECT</option>
                                    </Input>
                                </td>
                                <td>
                                    <Button color="primary" onClick={this.addParams.bind(this,index)}>پارامترها</Button>
                                    <Button color="danger"  onClick={this.deleteField.bind(this,index)}>Delete</Button>
                                </td>

                            </tr>
                            
                        })
                        }
                    </tbody>
                    <tfoot>
                        <Button color="sucess" onClick={this.addField}>Add</Button>
                        <Button color="secondary" type="submit">Save</Button>
                    </tfoot>
                </Table>
                </form>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <form onSubmit={(e)=>this.handleParamsSave(e)}>
                <ModalHeader toggle={this.toggle}>افزودن مقادیر</ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>عنوان</th>
                                <th>مقدار</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.params.map((param,index)=>{
                                    return  <tr key={index}>
                                                <td>{index+1}</td>
                                                <td><Input required type="text" value={this.state.params[index].caption} name="caption" onChange={this.handleParamChange.bind(this,index)}/></td>
                                                <td><Input required type="text" value={this.state.params[index].value} name="value" onChange={this.handleParamChange.bind(this,index)}/></td>
                                                <td><Button color="danger" onClick={this.deleteParamRow.bind(this,index)}>Delete</Button></td>
                                            </tr>   
                                })
                            }
                        </tbody>
                        <tfoot>
                            <Button onClick={this.addParamRow}>افزودن</Button>
                        </tfoot>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">Save</Button>
                    <Button color="secondary" onClick={()=>this.cancel()}>Cancel</Button>
                </ModalFooter>
                </form>
                </Modal>

                <pre align="left">{this.state.saved ? JSON.stringify(this.state.form,null, 2) : ""  }</pre>

            </div>
        )
    }
}

export default DynaFrmCreator