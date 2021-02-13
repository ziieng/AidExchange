import React from 'react'
import fire from '../firebase.js';

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
    <button className="btn btn-info" onClick={logout}>Logout</button>
  )
}