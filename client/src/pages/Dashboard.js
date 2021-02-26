import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Listing from "../Components/Cards/listing";
import Reservation from "../Components/Cards/reservation";
import fire from "../firebase.js";
import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../Components/NavBar/navbar";
import API from "../utils/API";

export default function Dashboard() {
  const [myPosts, setMyPosts] = useState([]);
  const [myReplies, setMyReplies] = useState([]);
  let uid = fire.auth().currentUser.uid;

  useEffect(() => {
    loadListings();
  }, []);

  function loadListings() {
    //user's posts
    API.getUserListing({ params: { uid: uid } }).then((res) => {
      console.log(res);
      setMyPosts(res.data);
    });
    API.getUserReplies({ params: { uid: uid } }).then((res) => {
      console.log(res);
      setMyReplies(res.data);
    });
  }

  return (
    <>
      <NavBar />
      <Container>
        <Col md={{ span: 6, offset: 3 }}>
        <Row className='welcome'>
          <h1> Welcome to AidExchange!</h1>
        </Row>
        <Row className='dashboardDescrip'>
          <br></br>
          <h5> This is your main dashboard!
            <br></br>Here, you can view all of your current listings & reservations.</h5>
        </Row>
        </Col>
        <Row className="mt-5 w-100">
          <h2>
            My Listings{" "}
            <Link to="./NewListing" className="btn ml-2 text-white">
              Add New Listing
            </Link>
          </h2>
          {/* Map through their posts to make: */}
        </Row>
        <Row>
          {myPosts.length ? (
            <>
              {myPosts.map((post) => {
                return <Listing key={post._id} value={post} uid={uid} />;
              })}
            </>
          ) : (
              <h5>No Results to Display</h5>
            )}
        </Row>
        <Row className="mt-5 w-100">
          <h2>
            My Reservations{" "}
            <Link to="./Search" className="btn ml-2 text-white">
              Search For Items
            </Link>
          </h2>
          {/* Map through their reservations to make: */}
        </Row>
        <Row>
          {myReplies.length ? (
            <>
              {myReplies.map((post) => {
                return <Reservation key={post._id} value={post} />;
              })}
            </>
          ) : (
              <h5>No Results to Display</h5>
            )}
        </Row>
      </Container>
    </>
  );
}
