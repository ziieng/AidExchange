import React from "react";
import { Jumbotron, Image } from "react-bootstrap";

export default function Header(props) {
    return (
        <Jumbotron className="jumbotron jumbotron-fluid">
                <Image className="img-fluid splashBrand" src='../brand.png'></Image>
            <hr className='underline w-75' />
        </Jumbotron>
    );
}
