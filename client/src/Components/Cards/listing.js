import React from 'react';
import NavBar from '../NavBar/navbar'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
export default function listing() {
    return (
        <Card className='myList'>
            <Card.Body className="row"  >

                <Card.Text className="col-2">
                    <Button className="">Open</Button>
                </Card.Text>
                <ListGroup className="col-8 list-group-flush">
                    <ListGroupItem className="">Item Name
                        {/* <li className="list-group-item"></li> */}
                    </ListGroupItem>
                    <ListGroupItem>Item Category</ListGroupItem>
                    <ListGroupItem>Item Location</ListGroupItem>
                </ListGroup>
                <Card.Text className="col-2">
                <Button className='edit'>Edit</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
