import * as React from "react";
import { Navbar, Nav } from "react-bootstrap";

export interface INavProps { 
}

// 'helloProps' describes the shape of props.
// state is never set so we use the '{}' type.
export class BitcoinNavbar extends React.Component<INavProps, {}> {
    render() {
        return(
        <div>
            <Navbar bg="primary" expand="lg" variant="dark">
                <Navbar.Brand href="#home">Bitcoin Patrol</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>   
        )
    }      
}