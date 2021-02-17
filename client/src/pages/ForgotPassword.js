import React, { useRef, useState } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'
// import { useAuth } from '../contexts/AuthContext';
// import { auth } from "../../src/firebase"
import fire from '../firebase.js';
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef();
    // const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await fire.auth().sendPasswordResetEmail(emailRef.current.value)
            setMessage('Check your email')
        } catch {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        <>
            <Container className=" align-items-center mb-5 mt-5 py-3 px-4 bg-light rounded w-25">
                <h1 className="text-center mb-4">Reset Password</h1>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/">Log In</Link>
                </div>
            </Container>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/Signup">Sign Up</Link>
            </div>
        </>
    )
}
