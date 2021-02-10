import React from 'react';
import { Link } from "react-router-dom";

export default function signup() {
    return (
        <div>
            <div className="container text-center  mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
                <h1 className="text-center">Welcome to AidExchange</h1>
                <br />
                <form className="login text-center">
                    <div className="form-group">

                        <input type="text" className="form-control" id="username" placeholder="Email" />
                    </div>
                    <div className="form-group">

                        <input type="text" className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div class="form-group">

                        <input type="password" class="form-control" id="password" placeholder="password" />
                    </div>

                    <a id="createBtn" type="submit" href="/" class="cardShadow btn btn-success justify-content-center">sign up</a>

                </form>
                <br />
                <p>Or log in <Link to="./Login">here.</Link></p>
                <br />
            </div>
        </div>
    )
}
