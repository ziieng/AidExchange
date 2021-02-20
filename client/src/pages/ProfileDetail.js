import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import TopNav from "../Components/NavBar/navbar";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import fire from "../firebase.js";
import Listing from "../Components/Cards/listing";

export default function ProfileDetail(props) {
  let uid = fire.auth().currentUser.uid;
  let { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState({
    email: "",
    displayName: "",
    acctType: "",
    location: {},
    links: [],
    userId: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    API.getUser(id).then((res) => {
      console.log(res);
      setUser(res.data);
    });
    API.getUserListing({ params: { uid: id } }).then((res) => {
      setUserPosts(res.data);
    });
  }
  return (
    <>
      <TopNav />
      <Container>
        <Card className="profileDetails">
          <Card.Body>
            <Card.Img
              className="userImage"
              variant="top"
              src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
              alt={"user profile image for " + user.displayName}
            />
            <Card.Title>{user.displayName}</Card.Title>
            {user.links ? (
              <>
                {user.links.map((link, i) => {
                  return (
                    <Card.Link key={i} href={link.url}>
                      {link.label}
                    </Card.Link>
                  );
                })}
              </>
            ) : (
              <Card.Subtitle>(No links provided)</Card.Subtitle>
            )}
            {user.description ? (
              <Card.Text>
                {user.description} <br></br>
              </Card.Text>
            ) : (
              <Card.Text>
                (No description provided) <br></br>
              </Card.Text>
            )}
            {id === uid ? (
              <Button
                className="editProfile"
                variant="dark"
                href="/editprofile"
              >
                Edit Profile
              </Button>
            ) : (
              " "
            )}
          </Card.Body>
        </Card>
        {userPosts.length ? (
          <>
            {userPosts.map((post) => {
              return <Listing key={post._id} value={post} />;
            })}
          </>
        ) : (
          <h3>No Listings to Display</h3>
        )}
      </Container>
    </>
  );
}
