import React from 'react'
import fire from '../firebaseConfig.js';

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
    <button onClick={logout}>Logout</button>
  )
}