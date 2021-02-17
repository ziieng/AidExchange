import React from 'react'
import { Link } from "react-router-dom";
import Listing from "../Components/Cards/listing"
import Reservation from "../Components/Cards/reservation"

import { Container, Card } from 'react-bootstrap';
import NavBar from "../Components/NavBar/navbar";

export default function Dashboard() {
  return (<>
    <NavBar />
    <Card className="mt-5 ml-5  w-75" >
      <Card.Body>
        <Card.Title>My Listings <Link to="./NewListing" className="btn ml-2 text-white">Add New Listing</Link></Card.Title>

        {/* Map through their listings to make: */}
        <Card.Text>
          <Listing />
        </Card.Text>
      </Card.Body>
    </Card>
    <Card className="mt-5 ml-5 w-75" >
      <Card.Body>
        <Card.Title>My Reservations <Link to="" className="btn ml-2 text-white">Search For Items</Link></Card.Title>
        <Card.Text>
          {/* Map through their reservations to make: */}
          <Reservation />
        </Card.Text>
      </Card.Body>
    </Card>
  </>)
}