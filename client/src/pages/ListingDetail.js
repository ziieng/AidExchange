import React from 'react'
import TopNav from '../Components/NavBar/navbar';
import { Card, ListGroup, ListGroupItem, Button, Table } from 'react-bootstrap';


export default function ListingDetails() {
    return (
        <>
            < TopNav />
            <Card className='listingDetails' >
                <Card.Body>
                    <Card.Img className='icon' variant="top" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" />
                    <Card.Title>Rad Organization</Card.Title>
                    <Card.Link href="#">Website</Card.Link>
                    <Card.Link href="#">Socail Media</Card.Link>
                    <Card.Link href="#">Venmo</Card.Link>
                    <Card.Text>
                        Description <br></br>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem></ListGroupItem>
                            <ListGroupItem>Location</ListGroupItem>
                        </ListGroup>
                    </Card.Text>
                    <Button className='editProfile' variant="dark">Edit Profile</Button>
                </Card.Body>
            </Card>
            <Card className='map'>
                <Card.Img className='mapPush' variant="top" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" />
            </Card>
            <Card className='contents'>
                <Card.Body>
                    <h2> Contents: </h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Items</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Example</td>
                                <td>Example</td>
                                <td>Example</td>
                            </tr>
                            <tr>
                                <td>Example</td>
                                <td>Example</td>
                                <td>Example</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button className='donateRequest' variant="dark">Donate/Request</Button>
                </Card.Body>
            </Card>
        </>

    )
}