import React from 'react';
import NavBar from '../NavBar/navbar'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
export default function listing() {
    return (
        <Card className='myList'>
            <Card.Body className="row"  >

                <Card.Text className="col-2">
                    <Button className="">Edit</Button>
                </Card.Text>
                <ListGroup className="col-8 list-group-flush">
                    <ListGroupItem className="">jjdjdjjdj
                        {/* <li className="list-group-item"></li> */}
                    </ListGroupItem>
                    <ListGroupItem>gggdgggd</ListGroupItem>
                    <ListGroupItem>hhahhaha</ListGroupItem>
                </ListGroup>
                <Card.Text className="col-2">
                    <Button>open</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
