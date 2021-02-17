import React from "react";
import { Navbar, Nav } from 'react-bootstrap'

// import LogoutButton from '../LogoutButton'
import fire from '../../firebase.js';

export default function TopNav() {
  const logout = () => {
    fire.auth().signOut()
      .then(() => {
        window.location.href = "/";
        // Sign-out successful.
      }).catch((error) => {
        console.log(error)
        window.location.href = "/";
        // An error happened.
      })
  }
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark">
      <Navbar.Brand href="">AidExchange</Navbar.Brand>
      <Nav className="justify-content-end" style={{ width: "100%" }}>
        <Nav.Link href="/">Dashboard</Nav.Link>
        <Nav.Link href="/profiledetail">Profile</Nav.Link>
        <Nav.Link href="">Search</Nav.Link>
        <Nav.Link onClick={logout}>Logout</Nav.Link>

      </Nav>
    </Navbar>
  );
}

