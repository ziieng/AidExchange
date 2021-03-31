import React, { useState, useEffect } from "react";
import { Card, Table, Button, Container, Row, Col } from "react-bootstrap";
import API from "../utils/API";
import { useParams, Link } from "react-router-dom";
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
  const [myReply, setMyReply] = useState(null)
  const [replies, setReplies] = useState(false)
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [mapRender, setMapRender] = useState(false);
  useEffect(() => {
    loadListing();
  }, []);

  function loadListing() {
    API.getListing(id)
      .then((res) => {
        console.log(res)
        let post = res.data
        setListing(post);
        if (post.location) {
          setLocation({
            lat: post.location.coordinates[1],
            lng: post.location.coordinates[0],
          })
        };
        setReplies(post.replies)
        let filterReply = post.replies.filter(el => el.userId === uid)
        if (filterReply[0]) {
          setMyReply(filterReply)
        }
      })
      //extra .then so the location update finishes before the map renders
      .then(() => {
        setMapRender(true);
      });
  }

  return (
    <>
      {!mapRender ? (<h3>Loading....</h3>) :
        (<Container className="d-flex justify-content-center">
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
                    <Card.Link as={Link} to={"/profile/" + listing.postBy.userId}>
                      {listing.postBy.displayName}
                    </Card.Link>
                  </Card.Subtitle>
                  {listing.description && (
                    <Card.Text>{listing.description}</Card.Text>
                  )}

                  {listing.userId === uid ? (
                    <Button as={Link}
                      className="editProfile"
                      variant="dark"
                      to={"/editlisting/" + id}
                    >
                      Edit Listing
                    </Button>
                  ) : (
                      " "
                    )}
                </Card.Body>
              </Card>
              <Card className="map">
                <MyMapComponent isMarkerShown={true} coords={location} />
              </Card>
            </Row>
            <br></br>
            <Row>
              <div className="contents">
                <div className="d-flex">
                  <h2 className="float-left">
                    Contents:
                  </h2><div className="input-group justify-content-end align-items-center">
                    <Button
                        variant="dark"
                        href={"/reply/" + id}
                      className="mx-1"
                    >{myReply && "Edit/"}{(listing.postType === "Request") ? "Donate" : "Request"}</Button>
                    {/* This is the download link */}
                    {myReply && <Print listing={listing} />}
                    {/* ------------------------- */}
                  </div>
                </div>
                <Table className="bg-light" striped bordered hover>
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
              </div>
            </Row>
            {/* <Row>
              {replies.length ? (
                <>
                  {replies.map((reply, i) => {
                    return <Reservation key={i} value={post} />;
                  })}
                </>
              ) : (
                  <h5>No Results to Display</h5>
                )}
            </Row> */}
          </Col>
        </Container>
        )}
    </>
  );
}
