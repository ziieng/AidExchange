import React, { useState } from "react";
import { Link } from "react-router-dom";
import Firebase from "./firebaseConfig";

export default function signup() {
  state = {
    email: "",
    password: "",
  };

  //   const [email, setEmail] = useState([]);
  //   const [password, setPassword] = useState({});

  // handle user sign up
  handleSignUp = (e) => {
    e.preventDefault();

    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  return (
    <div>
      <div className="container text-center  mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
        <h1 className="text-center">Welcome to AidExchange</h1>
        <br />
        <form className="login text-center">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="username"
              placeholder="Email"
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              value={this.state.password}
            />
          </div>

          <a
            id="createBtn"
            type="submit"
            href="/"
            className="cardShadow btn btn-success justify-content-center"
          >
            sign up
          </a>
        </form>
        <br />
        <p>
          Or log in <Link to="./Login">here.</Link>
        </p>
        <br />
      </div>
    </div>
  );
}
