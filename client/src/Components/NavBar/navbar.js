import React from "react";
import { Navbar, Nav } from 'react-bootstrap'
import LogoutButton from '../LogoutButton'

export default function TopNav() {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark">
      <Navbar.Brand href="">AidExchange</Navbar.Brand>
        <Nav className="justify-content-end" style={{ width: "100%" }}>
        <Nav.Link href="/">Dashboard</Nav.Link>
        <Nav.Link href="/profiledetail">Profile</Nav.Link>
        <Nav.Link href="">Search</Nav.Link>
        <LogoutButton />
        {/* <Nav.Link href="">Logout</Nav.Link> */}
      </Nav>
    </Navbar>
  );
}

