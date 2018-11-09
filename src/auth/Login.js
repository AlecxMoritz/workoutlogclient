import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styled from 'styled-components'
import { AuthContext } from './AuthContext';

const FancyLogin = styled.h1`
    margin-left: 1em;
    margin-bottom: 1em;
    color: rgb(39, 112, 229)
`
const FancyText = styled.h6`
    padding: 1em;
`

const FancyLabel =styled.label`
    margin-left: 1em;
`
const FancyButton = styled.button`
    background-color: #1b5dc6
`

class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            userId: ''
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
        });
        
    }

    handleSubmit(event) {
        console.log(this.state)
        fetch("http://localhost:4000/user/login", {
            method: 'POST',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            localStorage.setItem('username', data.user.username)
            this.props.setToken(data.sessionToken)
            this.props.addImage(data.user.img)
            console.log(data.user.username)
        })
        .catch(function(err) {
            console.log("Error")
        })
        console.log("function ended")
        event.preventDefault();
        // missing something to pass off to the workout index
        
    }

    render() {
        return (
            <div>
                <FancyLogin>Login</FancyLogin>
                <FancyText>You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.</FancyText>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FancyLabel for="username">Username</FancyLabel>
                            <Input id="li_username" type="text" name="username" placeholder="enter username" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FancyLabel for="password">Password</FancyLabel>
                            <Input id="li_password" type="password" name="password" placeholder="enter password" onChange={this.handleChange}/>
                        </FormGroup>
                        <Button color="primary" type="submit"> Log in </Button>
                    </Form>
                </div>
        ); 
    }
}

export default props => (
    <AuthContext.Consumer>
        {auth => <Login {...props} auth={auth} />}
    </AuthContext.Consumer>
)