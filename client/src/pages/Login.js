import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import fire from '../firebase.js';
import { Alert } from "react-bootstrap"

export default function login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await fire.auth().signInWithEmailAndPassword(email, password)
            history.push("/")
        } catch {
            setError("Password or email incorrect.")
        }

        setLoading(false)
    }

    return (
        <div className="container text-center  mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
            <h1 className="text-center">Sign In</h1>
            <br />
            {error && <Alert variant="danger">{error}</Alert>}
            <form className="login text-center" onSubmit={handleSubmit}>
                <div className="form-group">

                    <input type="text" className="form-control" name="username" onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
                </div>
                <div className="form-group">

                    <input type="password" className="form-control" name="password" onChange={({ target }) => setPassword(target.value)} placeholder="password" />
                </div>
                <button type="submit" className="cardShadow btn btn-success justify-content-center" disabled={loading} >Login</button>

            </form>
            <br />
            <p>Not a user?</p>
            <p>Create an account <Link to="./Signup">here.</Link></p>
            <br />
        </div>
    )
}
