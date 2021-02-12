import React, { useState } from 'react';
import { Link } from "react-router-dom";
import API from "../../utils/API"
import Header from '../Jumbotron/header'
import Footer from '../Footer/footer'
import fire from "../../firebaseConfig";
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton"

export default function signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplay] = useState("");
    const [acctType, setAcctType] = useState("Individual");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== "" && password !== "" && displayName.length > 3) {
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
        <div>
            <Header />
            <div className="container text-center  mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
                <h1 className="text-center">Welcome to AidExchange</h1>
                <br />
                <form className="login text-center" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text"
                            onChange={({ target }) => setEmail(target.value)} className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            onChange={({ target }) => setDisplay(target.value)} id="displayName" placeholder="Display Name" />
                    </div>
                    <div className="form-group">
                        <input type="password"
                            onChange={({ target }) => setPassword(target.value)} className="form-control" id="password" placeholder="password" />
                    </div>

                    <div className="form-group">
                        <DropdownButton id="acctType" title={acctType}>
                            <Dropdown.Item onSelect={() => setAcctType("Individual")}>Individual</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAcctType("Organization")}>Organization</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAcctType("501(c)(3)")}>501(c)(3)</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <button id="createBtn" type="submit" className="cardShadow btn btn-success justify-content-center">sign up</button>

                </form>
                <br />
                <p>Or log in <Link to="./Login">here.</Link></p>
                <br />
            </div>
            <Footer />
        </div>
    )
}
