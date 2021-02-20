import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Alert, Container, Form, Button, Col } from "react-bootstrap"
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
    const history = useHistory();


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
                        userId: uid
                    })
                    history.push("/")
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
        <>
            <Container className=' d-flex justify-content-center'>
                <Col sm md='auto' lg xl='6' className="align-items-center mb-5 mt-5 py-3 px-4 bg-light rounded">
                    <h1 className="text-center mb-4">Create New Account</h1>

                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form className="login text-center" onSubmit={handleSubmit}>
                        <Form.Group className="">

                            <Form.Control type="text" onChange={({ target }) => setEmail(target.value)} className="form-control" name="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group className="">

                            <Form.Control type="text" onChange={({ target }) => setDisplay(target.value)} className="form-control" name="displayName" placeholder="Display Name" />
                        </Form.Group>
                        <Form.Group className="">

                            <Form.Control type="password" onChange={({ target }) => setPassword(target.value)} className="form-control" name="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="">

                            <Form.Control type="password" onChange={({ target }) => setPasswordConfirm(target.value)} className="form-control" name="passwordConfirm" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group >

                            <select onChange={({ target }) => setAcctType(target.value)} className="form-select form-select-lg mb-3 form-control" name="acctType" >
                                <option value="">Type</option>
                                <option value="Individual">Personal User</option>
                                <option value="Charity">501(c)(3) Organizer</option>
                                <option value="Organization">Non-501 Organizer</option>
                            </select>
                        </Form.Group>

                        <Button id="createBtn" type="submit" disabled={loading}>Sign Up</Button>

                        <br />

                        <p>Or log in <Link to="/">here.</Link></p>
                        <br />
                    </Form>
                </Col>
            </Container>
        </>
    )
}
