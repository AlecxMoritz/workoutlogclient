import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class WorkoutCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: '',
            description: '',
            def: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        fetch('http://localhost:4000/log/new', {
            method: 'POST',
            body: JSON.stringify({ log: this.state }),
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Authorization' : this.props.token
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            this.props.updateWorkoutsArray()
            this.setState({
                id: '',
                result: '',
                description: '',
                def: ''
            })
        })
        console.log("Function ended")
        event.preventDefault();   // was originally at the top
    }
    
    render() {
        return (
            <div>
                <h3>Log a Workout</h3>
                <hr />
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="result">Result</Label>
                        <Input id="result"  type="text" name="result" value={this.state.result} placeholder="enter result" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="def">Type</Label>
                        <Input type="select" name="def" id="def" value={this.state.def} onChange={this.handleChange} placeholder="Type">
                            <option value="Time">Time</option>
                            <option value="Weight">Weight</option>
                            <option value="Distance">Distance</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Notes</Label>
                        <Input id="description" type="text" name="description" value={this.state.description} placeholder="enter a description" onChange={this.handleChange} />
                    </FormGroup>
                    <Button type="submit" color="primary"> Submit </Button>
                </Form>
            </div>
        )
    }

}

export default WorkoutCreate;