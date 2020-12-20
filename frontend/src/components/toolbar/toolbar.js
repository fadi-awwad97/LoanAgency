import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from '../../assets/logo.jpg';
import './toolbar.css';
export default function App() {
  return (
    <>
      <Navbar className="nav-bar">
        <Navbar.Brand className="nav-brand" href="#home">
        {"FLY"}<img
            alt="logo"
            src={Logo}
            width="70"
            height="70"
          />{"FLY"}
          <div className="logo-title">FINANCIAL</div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="nav-links">
            <Nav.Link  href="/">HOME</Nav.Link>
            <Nav.Link  href="/applyHome">APPLY NOW</Nav.Link>
            <NavDropdown title="PERSONAL LOANS">
              <NavDropdown.Item href="#action/1">LONG TERM</NavDropdown.Item>
              <NavDropdown.Item href="#action/2">SHORT TERM </NavDropdown.Item>
              <NavDropdown.Item href="#action/3">WEDDING</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/4"> STUDENT </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link  href="#sad">RESOURCES</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}