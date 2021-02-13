import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

export default function Header(props) {
    return (
        <Jumbotron className="jumbotron jumbotron-fluid">
            <Container className="container">
                <h1 className="display-4">AidExchange</h1>
                <p className="lead">Helping you help others.</p>
            <hr className='my-4 underline'></hr>
            </Container>
        </Jumbotron>
    );
}
