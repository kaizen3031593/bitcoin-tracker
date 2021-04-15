import * as React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import fontAwesomeLib from './core/IconLibrary';

fontAwesomeLib.init();

const bitcoinIconDefinition: IconDefinition = findIconDefinition({ prefix: 'fab', iconName: 'bitcoin' });

export interface INavProps { 
}

// 'helloProps' describes the shape of props.
// state is never set so we use the '{}' type.
export class BitcoinNavbar extends React.Component<INavProps, {}> {
    render() {
        return(
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="#home">
                    <FontAwesomeIcon icon={bitcoinIconDefinition} size={"2x"} className="slow-spin"/>
                    {" "}Bitcoin Patrol
                </Navbar.Brand>
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