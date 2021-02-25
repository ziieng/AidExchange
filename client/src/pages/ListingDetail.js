import React, { useState, useEffect } from "react";
import { Card, Table, Button, Container, Row, Col } from "react-bootstrap";
import TopNav from "../Components/NavBar/navbar";
import API from "../utils/API";
import { useParams } from "react-router-dom";
import Print from "../utils/document";
import MyMapComponent from "../Components/Map";
import fire from "../firebase.js";

export default function ListingDetail() {
  let uid = fire.auth().currentUser.uid;
  let { id } = useParams();
  const [listing, setListing] = useState({
    contents: [],
    postBy: { displayName: "", avatar: "" },
  });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [mapRender, setMapRender] = useState(false);
  useEffect(() => {
    loadListing();
  }, []);

  function loadListing() {
    API.getListing(id)
      .then((res) => {
        let post = res.data
        setListing(post);
        if (post.location) {
          setLocation({
            lat: post.location.coordinates[1],
            lng: post.location.coordinates[0],
          })
        };
      })
      //extra .then so the location update finishes before the map renders
      .then(() => {
        setMapRender(true);
      });
  }

  return (
    <>
      <TopNav />
      <Container className="d-flex justify-content-center">
        <Col>
          <Row>
            <Card className="listingDetail">
              <Card.Body className='marginTop'>
                <Card.Img
                  className="icon"
                  variant="top"
                  src={listing.postBy.avatar}
                  alt={"user profile image for " + listing.postBy.displayName}
                />
                <Card.Title>{listing.title}</Card.Title>
                <Card.Subtitle>
                  <Card.Link href={"/profile/" + listing.postBy.userId}>
                    {listing.postBy.displayName}
                  </Card.Link>
                </Card.Subtitle>
                {listing.description && (
                  <Card.Text>{listing.description}</Card.Text>
                )}

                {listing.userId === uid ? (
                  <Button
                    className="editProfile"
                    variant="dark"
                    href={"/editlisting/" + id}
                  >
                    Edit Listing
                  </Button>
                ) : (
                    " "
                  )}
              </Card.Body>
            </Card>
            <Card className="map">
              {mapRender && (
                <MyMapComponent isMarkerShown={true} coords={location} />
              )}
            </Card>
          </Row>
          <br></br>
          <Row>
            <Card className="contents">
              <Card.Body>
                <h2>
                  {" "}
                  Contents:{" "}
                  <div>
                  <Button
                    className="donateRequest"
                    variant="dark"
                  >
                    {(listing.postType === "Request") ? "Donate" : "Request"}
                  </Button>
                {/* This is the download link */}
                {mapRender && <Print listing={listing} />}
                {/* ------------------------- */}
                </div>
                </h2>
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
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Container>
    </>
  );
}
