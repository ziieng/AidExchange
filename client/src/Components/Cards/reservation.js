import React from 'react'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function reservation() {
    return (
        <Card className='reservations'>
            <Card.Body className="row"  >

                <Card.Text className="col-2">
                    <Button className="">Edit</Button>
                </Card.Text>
                <ListGroup className="col-8 list-group-flush">
                    <ListGroupItem className="">
                        {/* <li className="list-group-item"></li> */}
                    </ListGroupItem>
                    <ListGroupItem></ListGroupItem>
                    <ListGroupItem></ListGroupItem>
                </ListGroup>
                <Card.Text className="col-2">
                    <Button>open</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
