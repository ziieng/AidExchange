import React from "react";
import { Navbar, Nav } from 'react-bootstrap'
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
    <Navbar className="navbar navbar-expand-lg navbar-dark" expand="lg">
      <Navbar.Brand href="#home">
        <img
          src="../icon.png"
          width="150"
          height="40"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          <Nav.Link href='/'>Dashboard</Nav.Link>
          <Nav.Link href={'/profile/' + fire.auth().currentUser.uid}>Profile</Nav.Link>
          <Nav.Link href='/Search'>Search</Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  );
}

