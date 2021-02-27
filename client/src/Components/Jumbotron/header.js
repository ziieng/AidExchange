import React from "react";
import { Jumbotron, Container, Image } from "react-bootstrap";

export default function Header(props) {
    return (
        <Jumbotron className="jumbotron jumbotron-fluid">
            <Container className="container">
                <Image className="img-fluid splashBrand" src='../brand.png'></Image>
                <hr className='underline'></hr>
            </Container>
        </Jumbotron>
    );
}
