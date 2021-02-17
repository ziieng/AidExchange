import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Listing from "../Components/Cards/listing"
import Reservation from "../Components/Cards/reservation"
import fire from '../firebase.js';
import { Container, Card, Row, ListGroup } from 'react-bootstrap';
import NavBar from "../Components/NavBar/navbar";
import API from "../utils/API"

export default function Dashboard() {
  const [myPosts, setMyPosts] = useState({})

  useEffect(() => {
    loadListings()
  }, [])

  function loadListings() {
    let uid = fire.auth().currentUser.uid
    //user's posts
    API.getUserListing({ params: { uid: uid } })
      .then(res => console.log(res))
    API.getUserReplies({ params: { uid: uid } })
      .then(res => console.log(res))
}

  return (<>
    <NavBar />
    <Container>
      <Row className="mt-5 w-100" >
        <h2>My Listings <Link to="./NewListing" className="btn ml-2 text-white">Add New Listing</Link></h2>
        <ListGroup className="col-12 list-group-flush">
          <Listing />
        </ListGroup>
      </Row>
      <Row className="mt-5 w-100" >
        <h2>My Reservations <Link to="" className="btn ml-2 text-white">Search For Items</Link></h2>
        {/* Map through their reservations to make: */}
        <ListGroup className="col-12 list-group-flush">
          <Reservation />
        </ListGroup>
      </Row>
    </Container>
  </>)
}