import React from 'react';
import { Link } from "react-router-dom";

export default function signup() {
    return (
        <div>
            <div className="container text-center  mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
                <h1 className="text-center">Create New Account</h1>
                <br />
                <form className="login text-center" >
                    <div className="form-group">

                        <input type="text" className="form-control" name="email" placeholder="Email" />
                    </div>
                    <div className="form-group">

                        <input type="text" className="form-control" name="username" placeholder="Username" />
                    </div>
                    <div className="form-group">

                        <input type="password" className="form-control" name="password" placeholder="Password" />
                    </div>
                    <div >

                        <select className="form-select form-select-lg mb-3 form-control" name="type" >
                            <option value="">Type</option>
                            <option value="1">Individual</option>
                            <option value="2">501(c)(3) Organizer</option>
                            <option value="3">Non-501 Organizer</option>
                        </select>

                    </div>

                    <a id="createBtn" type="submit" href="/" className="cardShadow btn btn-success justify-content-center">sign up</a>

                </form>
                <br />
                <p>Or log in <Link to="./Login">here.</Link></p>
                <br />
            </div>
        </div>
    )
}
