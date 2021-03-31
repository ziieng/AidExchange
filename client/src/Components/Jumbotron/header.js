import React from "react";
import { Jumbotron, Image } from "react-bootstrap";

export default function Header(props) {
    return (
        <Jumbotron className="jumbotron jumbotron-fluid py-5">
            <Image className="img-fluid splashBrand" src='../bannerBrand.png'></Image>
            <hr className='underline w-75' />
        </Jumbotron>
    );
}
