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
                        type : '',
                        params : []
                    }]
                },
            currentFieldIndex : 0,
            modal: false,
            params : []

        }

        this.addField = this.addField.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteField = this.deleteField.bind(this)
        this.toggle = this.toggle.bind(this)
        this.addParamRow=this.addParamRow.bind(this)
        this.deleteParamRow = this.deleteParamRow.bind(this)
        this.handleParamsSave = this.handleParamsSave.bind(this)
    }

    addParams(index) {
        let field = this.state.form.fields.filter((field,idx)=>idx===index)
        this.setState({
            params : field[0].params,
            currentFieldIndex : index
        },()=>this.toggle())
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
            params : [{}]
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
    handleParamsSave(index) {
        let fields = this.state.form.fields
        console.log('فیلدهای',index)
        fields[index].params = this.state.params
        this.setState({
            form : {
                ...this.state.form,
                fields : fields
            },
            modal: false
        })
    }

    render() {
        return(
            <div>
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
                                <td><Input type="text" name="name" onChange={this.handleChange.bind(this,index)} value={this.state.form.fields[index].name}/></td>
                                <td><Input type="text" name="caption" onChange={this.handleChange.bind(this,index)} value={this.state.form.fields[index].caption}/></td>
                                <td>
                                    <Input type="select" name="type" onChange={this.handleChange.bind(this,index)} value={this.state.form.fields[index].type}>
                                        <option value="text">TEXT</option>
                                        <option value="email">EMAIL</option>
                                        <option value="check">CheckBox</option>
                                        <option value="check">Radio</option>
                                        <option value="select">SELECT</option>
                                        <option value="file">FILE</option>
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
                    </tfoot>
                </Table>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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
                                                <td><Input type="text" value={this.state.params[index].caption} name="caption" onChange={this.handleParamChange.bind(this,index)}/></td>
                                                <td><Input type="text" value={this.state.params[index].value} name="value" onChange={this.handleParamChange.bind(this,index)}/></td>
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
                    <Button color="primary" onClick={this.handleParamsSave.bind(this,this.state.currentFieldIndex)}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
                
            </div>
        )
    }
}

export default DynaFrmCreator