import react from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button
} from "react-bootstrap";

export default function NavContainer (props:any)
{
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/home">Employee Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/employee">Employee Mgmt.</Nav.Link>
                </Nav>                
            </Navbar.Collapse>
        </Navbar>
    );
};