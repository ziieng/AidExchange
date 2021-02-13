import React from 'react'
import { Link } from "react-router-dom";
import Listing from "../Components/Cards/listing"
import Reservation from "../Components/Cards/reservation"
import LogoutButton from "../Components/LogoutButton";

export default function Dashboard() {
  return (<>
    <div className="container bg-light w-75" >
      <LogoutButton />
      <div>
        <h3>My Listings <Link to="./NewListing" className="btn btn-info ml-2">Add New Listing</Link></h3>
      </div>
      {/* Map through their listings to make: */}
      <Listing />
    </div>
    <div className="container bg-info" >
      <div>
        <h3>My Reservations <Link to="" className="btn btn-info ml-2">Search For Items</Link></h3>
      </div>
      {/* Map through their reservations to make: */}
      <Reservation />
    </div>
  </>)
}