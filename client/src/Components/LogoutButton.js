import React from 'react'
import fire from '../firebase.js';
import { Button } from 'react-bootstrap'

export default () => {
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
    <Button className="btn btn-info" onClick={logout}>Logout</Button>
  )
}