import React from "react";
import { Navbar, Nav } from 'react-bootstrap'

function TopNav() {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Navbar.Brand href="">AidExchange</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href=""></Nav.Link>
          <Nav.Link href=""></Nav.Link>
        </Nav>
    </Navbar>
  );
}

export default TopNav;
