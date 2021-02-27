import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import fire from '../firebase.js';

import { Alert, Button, Col, Container, Form, InputGroup } from "react-bootstrap"



export default function login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showpassword, setShowPassword] = useState(false);
    const history = useHistory()
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()
        if (!email || !password) {
            return setError("Email or password missing.")
        }
        try {
            setError("")
            setLoading(true)
            setMessage("Hmm...")
            await fire.auth().signInWithEmailAndPassword(email, password)
            setMessage("Welcome!")
            history.push("/")
        } catch {
            setMessage("")
            setError("Password or Email incorrect.")
        }
        setLoading(false)
    }

    function togglePasswordVisiblity(e) {
        e.preventDefault()
        setShowPassword(showpassword => !showpassword)
    }

    return (
        <>
            <Container className="d-flex justify-content-center">
                <Col sm md='auto' lg xl='6' className="align-items-center my-4 p-5 bg-light rounded">

                    <h1 className="text-center mb-4">Sign In</h1>
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form className="login text-center" onSubmit={handleSubmit}>
                        <Form.Group >

                            <Form.Control type="text" name="username" onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
                        </Form.Group>
                        <Form.Group className="required">
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
                        </Form.Group>
                        <Button type="submit" className=" justify-content-center" disabled={loading} >Login</Button>

                    </Form>
                    <div className="text-center mt-3"><Link to="/ForgotPassword">Forgot Password?</Link></div>
                    <div className="text-center mt-3">
                        <p>Not a user?
                    Create an account <Link to="/Signup">here.</Link>
                        </p>
                    </div>
                </Col>
            </Container >
        </>
    )
}
