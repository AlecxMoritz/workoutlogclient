import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styled from 'styled-components'

const FancySignup = styled.h1`
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





class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isEmpty: true,
        };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.validateSignUp = this.validateSignup.bind(this);
            
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        
    }


      // left off here // not working?? ////
    handleSubmit(event) {
        fetch("http://localhost:4000/user/signup", {
            method: 'POST',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        }).then(
            (response) => response.json()
            
            
        ).then((data) => {
            this.props.setToken(data.sessionToken)
            console.log(data)
        })
    
        event.preventDefault();
    }

    validateSignup(event) {
        // this.setState({
        //     errorMessage: "Fields must not be empty."
        // })
        event.preventDefault();
        document.getElementById('usernameAlert').style.display = 'block';
    
    }

    validatePassword(event) {
        event.preventDefault();
        document.getElementById('passwordAlert').style.display = 'block';
    }


    

    render() {
       
        const submitHandler = !this.state.username ? this.validateSignup : this.handleSubmit
        return (
            <div>
                <FancySignup>Sign Up</FancySignup>
                <FancyText>The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.</FancyText>
                <Form onSubmit={submitHandler}>
                    <FormGroup>
                        <FancyLabel for="username">Username</FancyLabel>
                        <Input id="username" type="text" name="username" placeholder="please enter your username" onChange={this.handleChange}  />
                        <div id="usernameAlert" style={{display: 'none'}}>Username field must not be blank</div>
                    </FormGroup>
                    <FormGroup>
                        <FancyLabel for="password">Password</FancyLabel>
                        <Input id="su_password" type="password" name="password" placeholder="please enter your password" onChange={this.handleChange} /><div id="passwordAlert" style={{display: 'none'}}>Password needs one uppercase letter.</div>
                    </FormGroup>
                    <Button color="primary" type="submit"> Sign Up </Button>
                </Form>
            </div>
        )
    }
}

export default Signup;