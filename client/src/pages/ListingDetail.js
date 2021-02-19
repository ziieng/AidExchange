import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Container, Row, Col } from 'react-bootstrap';
import TopNav from '../Components/NavBar/navbar';
import API from "../utils/API"
import { useParams } from "react-router-dom"

export default function ListingDetail() {
  let { id } = useParams()
  const [listing, setListing] = useState({ "contents": [], "postBy": { "displayName": "" } })

  useEffect(() => {
    loadListing()
  }, [])

  function loadListing() {
    API.getListing(id)
      .then(res => {
        console.log(res)
        setListing(res.data)
      })
  }

  return (
    <>
      < TopNav />
      <Container className="d-flex justify-content-center">
        <Col>
          <Row>
    <Card className='listingDetail'>
                <Card.Body>
                    <Card.Img className='icon' variant="top" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt={"user profile image for " + listing.postBy.displayName} />
                    <Card.Title>{listing.title}</Card.Title>
                <Card.Subtitle><Card.Link href={"/profile/" + listing.postBy.userId}>{listing.postBy.displayName}</Card.Link></Card.Subtitle>
                    {listing.description && <Card.Text>
                {listing.description}
              </Card.Text>}
              <Button className='editProfile' variant="dark">Edit Listing</Button>
                </Card.Body>
            </Card>
    <Card className='map'>
              <Card.Img className='mapPush' variant="top" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" /> (I'm a map)
            </Card>
          </Row>
          <Row>
    <Card className='contents'>
                <Card.Body>
                <h2> Contents: <Button className='donateRequest align-self-right' variant="dark">Donate/Request</Button></h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th>Quantity {listing.postType}ed</th>
                </tr>
              </thead>
              <tbody>
                {listing.contents.map((line, index) => {
                  return (
                    <tr key={index}>
                      <td>{line.item}</td>
                      <td>{line.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table></Card.Body>
            </Card>
          </Row>
        </Col>
      </Container>
    </>
  )
}
