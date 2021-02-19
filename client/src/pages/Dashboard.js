import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Listing from "../Components/Cards/listing"
import Reservation from "../Components/Cards/reservation"
import fire from '../firebase.js';
import { Container, Row } from 'react-bootstrap';
import NavBar from "../Components/NavBar/navbar";
import API from "../utils/API"

export default function Dashboard() {
  const [myPosts, setMyPosts] = useState([])
  const [myReplies, setMyReplies] = useState([])

  useEffect(() => {
    loadListings()
  }, [])

  function loadListings() {
    let uid = fire.auth().currentUser.uid
    //user's posts
    API.getUserListing({ params: { uid: uid } })
      .then(res => {
        console.log(res)
        setMyPosts(res.data)
      })
    API.getUserReplies({ params: { uid: uid } })
      .then(res => {
        console.log(res)
        setMyReplies(res.data)
      })
  }

  return (<>
    <NavBar />
    <Container>
      <Row className="mt-5 w-100" >
        <h2>My Listings <Link to="./NewListing" className="btn ml-2 text-white">Add New Listing</Link></h2>
        {/* Map through their posts to make: */}
      </Row>
      <Row>
        {myPosts.length ? (
          <>
            {myPosts.map(post => {
              return (
                <Listing key={post._id} value={post} />
              );
            })}
          </>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </Row>
      <Row className="mt-5 w-100" >
        <h2>My Reservations <Link to="" className="btn ml-2 text-white">Search For Items</Link></h2>
        {/* Map through their reservations to make: */}
      </Row>
      <Row>
        {myReplies.length ? (
          <>
            {myReplies.map(post => {
              return (
                <Reservation key={post._id} value={post} />
              );
            })}
          </>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </Row>
    </Container>
  </>)
}