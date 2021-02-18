import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import TopNav from "../Components/NavBar/navbar";

export default function ProfileDetail(props) {
  return (
    <>
      <TopNav />
      <Card className="profileDetails">
        <Card.Body>
          <Card.Img
            className="userImage"
            variant="top"
            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
          />
          <Card.Title>Rad Organization</Card.Title>
          <Card.Link href="#">Website</Card.Link>
          <Card.Link href="#">Socail Media</Card.Link>
          <Card.Link href="#">Venmo</Card.Link>
          <Card.Text>
            Description <br></br>
            <ListGroup className="list-group-flush">
              <ListGroupItem></ListGroupItem>
              <ListGroupItem>Location</ListGroupItem>
            </ListGroup>
          </Card.Text>
          <Button className="editProfile" variant="dark">
            Edit Profile
          </Button>{" "}
        </Card.Body>
      </Card>
    </>
  );
}
