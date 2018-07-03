import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Signup from './Signup';
import Login from './Login';
import './auth.css'

const Auth = (props) => {
  
    return (
        <Container className="auth-container">
            <Row>
                <Col md="6">
                    <Signup setToken={props.setToken}/>
                </Col>
                <Col md="6" className="login-col">
                    <Login setToken={props.setToken} addImage={props.addImage}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;