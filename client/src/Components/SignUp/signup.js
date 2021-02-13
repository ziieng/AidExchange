import React, { useState } from 'react';
import { Link } from "react-router-dom";
import API from "../../utils/API"
import fire from "../../firebaseConfig";

export default function signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplay] = useState("");
    const [acctType, setAcctType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password, displayName, acctType)
        if (email !== "" && password !== "" && displayName.length > 3 && acctType !== "") {
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
                    alert(errorMessage)
                    // ..
                });
        }
    }

    return (
        <div className="container text-center  mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
            <h1 className="text-center">Create New Account</h1>
            <br />
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
                <div >

                    <select onChange={({ target }) => setAcctType(target.value)} className="form-select form-select-lg mb-3 form-control" name="acctType" >
                        <option value="">I Am A...</option>
                        <option value="Individual">Personal User</option>
                        <option value="Charity">501(c)(3) Organizer</option>
                        <option value="Organization">Non-501 Organizer</option>
                    </select>
                </div>

                <button id="createBtn" type="submit" className="cardShadow btn btn-success justify-content-center">sign up</button>

            </form>
            <br />
            <p>Or log in <Link to="./Login">here.</Link></p>
            <br />
        </div>
    )
}
