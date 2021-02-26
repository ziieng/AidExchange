import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import TopNav from "../Components/NavBar/navbar";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import fire from "../firebase.js";
import Listing from "../Components/Cards/listing";
import GeoSearch from "../utils/GeoCodeSearch"

export default function ProfileDetail(props) {
  let uid = fire.auth().currentUser.uid;
  let { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [city, setCity] = useState("Location not set.")
  const [user, setUser] = useState({
    email: "",
    displayName: "",
    avatar: "",
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
      if (res.data.location !== "") {
        GeoSearch.addrFromCoords(res.data.location.coordinates)
          .then((addr) => {
            console.log(addr)
            setCity(addr.city + ", " + addr.state)
          })
          .catch((err) => {
            console.log("Address error: " + err)
          })
      }
      setUser(res.data);
    });
    API.getUserListing({ params: { uid: id } }).then((res) => {
      setUserPosts(res.data);
    });
  }
  return (
    <>
      <TopNav />
      <Card className="profileDetails">
        <Card.Body>
          <Card.Img
            className="userImage"
            variant="top"
            src={user.avatar}
            alt={"user profile image for " + user.displayName}
          />
          <Card.Title>{user.displayName}</Card.Title>
          <Card.Subtitle>
            {city} <br />
          </Card.Subtitle>

            {user.links ? (
              <>
                {user.links.map((link, i) => {
                  return (
                    <Card.Link target='_blank' rel="noreferrer" key={i} href={link.url}>
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
      <div id='orgListing' className="ml-5">
        <h2>Listings:</h2>
        {userPosts.length ? (
          <>
            {userPosts.map((post) => {
              return <>
                <Listing key={post._id} value={post} />
              </>
            })}
          </>
        ) : (
            <h3>No Listings to Display</h3>
          )}
      </div>
    </>
  );
}
