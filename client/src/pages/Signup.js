import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Alert, Container, Form, Button, Col, InputGroup } from "react-bootstrap"
import API from "../utils/API"
import fire from "../firebase";


export default function signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showpassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    function togglePasswordVisiblity(e) {
        e.preventDefault();
        setShowPassword(showpassword => !showpassword)
        console.log(showpassword)
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
                        <Form.Group >
                            <InputGroup>
                                <Form.Control type={showpassword ? "text" : "password"} className="" name="password" onChange={({ target }) => setPassword(target.value)} placeholder="Password" />
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className={`fa ${showpassword ? "fa-eye-slash" : "fa-eye"}  password-icon`} onClick={togglePasswordVisiblity} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group >
                            <InputGroup>
                                <Form.Control type={showConfirmPassword ? "text" : "password"} onChange={({ target }) => setPasswordConfirm(target.value)} className="form-control" name="passwordConfirm" placeholder="Confirm Password" />
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}  signuppassword-icon2`} onClick={() => { setShowConfirmPassword(showConfirmPassword => !showConfirmPassword) }} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
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
