import React from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';

import styled from 'styled-components'

// styles




class SiteBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false // might need to delete
        };
    this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
            <Navbar color="faded" light expand="md">
                <NavbarBrand style={{fontSize: "3em", marginLeft: "5em", color: "rgb(39, 112, 229)", fontWeight: "bold"}}href="/">Workout Log </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button color="primary" onClick={() => this.props.clickLogout()}>Logout</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            </div>
        )
    }
}


export default SiteBar;