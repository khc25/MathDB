import React, { Component } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">MathDB</Navbar.Brand>

                
                    <Nav className="mr-auto">

                        <Nav.Link href="/definition">Definition</Nav.Link>
                        <Nav.Link href="/proposition">Proposition</Nav.Link>
                    </Nav>
                
            </Navbar>
        )
    }
}

export default Header;