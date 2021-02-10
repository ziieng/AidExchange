import Header from '../Jumbotron/header'
import Footer from '../Footer/footer'
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import fire from '../../firebaseConfig.js';

export default function login(props) {
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
        <div>
            <Header />
            <div className="container-fluid text-center mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
                <h1 className="text-center">Welcome to AidExchange</h1>
                <br />
                <form className="login text-center" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text"
                            onChange={({ target }) => setEmail(target.value)} className="form-control" id="username" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            onChange={({ target }) => setPassword(target.value)} className="form-control" id="password" placeholder="password" />
                    </div>
                    <button type="submit" className="cardShadow btn btn-success justify-content-center">Login</button>
                </form>
                <br />
                <p>Not a user?</p>
                <p>Create an account <Link to="./Signup">here.</Link></p>
                <br />
            </div>
            <Footer />
        </div>
    )
}
