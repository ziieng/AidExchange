import React from "react";
import { Navbar, Nav } from 'react-bootstrap'

export default function TopNav() {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark">
      <Navbar.Brand href="">AidExchange</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="">Dashboard</Nav.Link>
          <Nav.Link href="">Profile</Nav.Link>
          <Nav.Link href="">Search</Nav.Link>
          <Nav.Link href="">Logout</Nav.Link>
        </Nav>
    </Navbar>
  );
}

