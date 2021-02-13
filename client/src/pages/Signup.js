import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap"
import API from "../utils/API"
import fire from "../firebase";

export default function signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [displayName, setDisplay] = useState("");
    const [acctType, setAcctType] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        if (email !== "" && password !== "" && password === passwordConfirm && displayName.length > 3 && acctType !== "") {
            fire.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    var uid = userCredential.user.uid;
                    //send all boxes and UID to the MongoDB
                    API.addUser({
                        email: email,
                        displayName: displayName,
                        acctType: acctType,
                        uid: uid
                    })
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    setError(errorMessage)
                    // ..
                });
        }
        setLoading(false)
    }

    return (
        <div className="container text-center  mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
            <h1 className="text-center">Create New Account</h1>
            <br />
            {error && <Alert variant="danger">{error}</Alert>}
            <form className="login text-center" onSubmit={handleSubmit}>
                <div className="form-group">

                    <input type="text" onChange={({ target }) => setEmail(target.value)} className="form-control" name="email" placeholder="Email" />
                </div>
                <div className="form-group">

                    <input type="text" onChange={({ target }) => setDisplay(target.value)} className="form-control" name="displayName" placeholder="Display Name" />
                </div>
                <div className="form-group">

                    <input type="password" onChange={({ target }) => setPassword(target.value)} className="form-control" name="password" placeholder="Password" />
                </div>
                <div className="form-group">

                    <input type="password" onChange={({ target }) => setPasswordConfirm(target.value)} className="form-control" name="passwordConfirm" placeholder="Confirm Password" />
                </div>
                <div >

                    <select onChange={({ target }) => setAcctType(target.value)} className="form-select form-select-lg mb-3 form-control" name="acctType" >
                        <option value="">I Am A...</option>
                        <option value="Individual">Personal User</option>
                        <option value="Charity">501(c)(3) Organizer</option>
                        <option value="Organization">Non-501 Organizer</option>
                    </select>
                </div>

                <button id="createBtn" type="submit" className="cardShadow btn btn-success justify-content-center" disabled={loading}>Sign Up</button>

            </form>
            <br />
            <p>Or log in <Link to="./Login">here.</Link></p>
            <br />
        </div>
    )
}
