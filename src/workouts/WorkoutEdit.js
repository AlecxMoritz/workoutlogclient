import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'

class WorkoutEdit extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            result: '',
            description: '',
            def: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        this.setState({
            id: this.props.workout.id,
            result: this.props.workout.result,
            description: this.props.workout.description,
            def: this.props.workout.def
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.update(event, this.state)
    }

    render() {

        return (
            <div>

                <Modal isOpen={true} >
                    <ModalHeader >Log a workout</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Label for="result">Result</Label>
                                <Input id="result" type="text" name="result" value={this.state.result} placeholder="enter a result" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="def">Type</Label>
                                <Input type="select" name="def" id="def" value={this.state.def} onChange={this.handleChange} placeholder="Type">
                                    <option></option>
                                    <option value="Time">Time</option>
                                    <option value="Weight">Weight</option>
                                    <option value="Distance">Distance</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Notes</Label>
                                <Input id="description" type="text" name="description" value={this.state.description} placeholder="enter description" onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary"> Submit </Button>
                        </Form>
                    </ModalBody>

                </Modal>

            </div>

        )
    }
}

export default WorkoutEdit;