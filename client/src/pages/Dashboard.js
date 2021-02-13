import React from 'react'
import { Link } from "react-router-dom";
import Listing from "../Components/Cards/listing"
import Reservation from "../Components/Cards/reservation"
import LogoutButton from "../Components/LogoutButton";
import { Container } from 'react-bootstrap';
import NavBar from "../Components/NavBar/navbar";

export default function Dashboard() {
  return (<>
    <NavBar />
    <Container className="container  w-75" >

      <LogoutButton />
      <div>
        <h3>My Listings <Link to="./NewListing" className="btn btn-info ml-2">Add New Listing</Link></h3>
      </div>
      {/* Map through their listings to make: */}
      <Listing />
    </Container>
    <Container className="container" >
      <div>
        <h3>My Reservations <Link to="" className="btn btn-info ml-2">Search For Items</Link></h3>
      </div>
      {/* Map through their reservations to make: */}
      <Reservation />
    </Container>
  </>)
}