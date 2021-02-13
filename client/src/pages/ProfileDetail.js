import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import TopNav from '../Components/NavBar/navbar';

export default function ProfileDetail(props) {
    return (
        <>
            < TopNav />
            <Card className='profileDetails' >
                <Card.Body>
                    <Card.Img className='userImage' variant="top" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" />

                    <Card.Title>Rad Organization</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Cras justo odio</ListGroupItem>
                            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                            <ListGroupItem>Vestibulum at eros</ListGroupItem>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </ListGroup>
                    </Card.Text>
                    <Button className='editProfile' variant="dark">Edit Profile</Button>{' '}
                </Card.Body>
            </Card>
        </>
    )
}
