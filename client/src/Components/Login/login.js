import React, { useState } from 'react'
import { Link } from "react-router-dom";
import fire from '../../firebaseConfig.js';

export default function login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="container text-center  mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
            <h1 className="text-center">Sign In</h1>
            <br />
            <form className="login text-center" onSubmit={handleSubmit}>
                <div className="form-group">

                    <input type="text" className="form-control" name="username" onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
                </div>
                <div className="form-group">

                    <input type="password" className="form-control" name="password" onChange={({ target }) => setPassword(target.value)} placeholder="password" />
                </div>
                <button type="submit" className="cardShadow btn btn-success justify-content-center">Login</button>
                {/* <a id="createBtn" type="submit" href="/" className="cardShadow btn btn-success justify-content-center"><Link to="./listing">Login</Link></a> */}

            </form>
            <br />
            <p>Not a user?</p>
            <p>Create an account <Link to="./Signup">here.</Link></p>
            <br />
        </div>
    )
}
