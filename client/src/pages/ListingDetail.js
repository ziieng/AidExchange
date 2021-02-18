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
            <Card className='listingDetail' >
              <Card.Title>{listing.title}</Card.Title>
              <Card.Subtitle><img className='userImage float-left' src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt={"user profile image for " + listing.postBy.displayName} /><Card.Link href={"/profile/" + listing.postBy.userId}>{listing.postBy.displayName}</Card.Link></Card.Subtitle>
              {listing.description && <Card.Text>
                {listing.description}
              </Card.Text>}

              <Button className='editProfile' variant="dark">Edit Listing</Button>{' '}
            </Card>
          </Row>
          <Row>
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
            </Table>
          </Row>
        </Col>
      </Container>
    </>
  )
}
