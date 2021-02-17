import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import Listing from "../Components/Cards/listing"
import Reservation from "../Components/Cards/reservation"
import fire from '../firebase.js';
import { Container, Card, Row, ListGroup } from 'react-bootstrap';
import NavBar from "../Components/NavBar/navbar";
import API from "../utils/API"

export default function Dashboard() {

  useEffect(() => {
    loadListings()
  }, [])

  function loadListings() {
    let uid = fire.auth().currentUser.uid
    API.getListing()
      .then(res => console.log(res))
  }

  return (<>
    <NavBar />
    <Container>
      <Row className="mt-5 ml-5  w-75" >
        <h2>My Listings <Link to="./NewListing" className="btn ml-2 text-white">Add New Listing</Link></h2>
        <ListGroup className="col-8 list-group-flush">
          <Listing />
        </ListGroup>
      </Row>
    <Card className="mt-5 ml-5 w-75" >
      <Card.Body>
          <Card.Title>My Reservations <Link to="" className="btn ml-2 text-white">Search For Items</Link></Card.Title>
        {/* Map through their reservations to make: */}
          <Reservation />
      </Card.Body>
    </Card>
    </Container>
  </>)
}