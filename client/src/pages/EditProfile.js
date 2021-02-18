import React, { useState, useEffect } from 'react'
import { Container, Button, Form, Card, Alert } from 'react-bootstrap'
import NavBar from '../Components/NavBar/navbar'
import API from "../utils/API"
import fire from '../firebase.js';

export default function editProfile() {
  // Setting our component's initial state
  const [displayName, setDisplayName] = useState("");
  const [acctType, setAcctType] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [links, setLinks] = useState([]);
  // const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let uid = fire.auth().currentUser.uid

  useEffect(() => {
    loadUser()
  }, [])

  function loadUser() {
    API.getUser(uid)
      .then(res => {
        console.log(res)
        let userData = res.data
        setDisplayName(userData.displayName)
        setAcctType(userData.acctType)
        setDescription(userData.description)
        setAvatar(userData.avatar)
        setLinks(userData.links)
      })
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    setLoading(true)
    if (displayName !== "" && acctType !== "") {
      API.updateUser({
        userId: uid,
        displayName: displayName,
        acctType: acctType,
        description: description,
        avatar: avatar,
        links: links
      })
        .then(data => console.log(data))
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage)
          setError(errorMessage)
        });
    } else {
      setError("Display Name and Account Type are required. (All other fields are optional.)")
    }
    setLoading(false)
  }

  return (
    <>
      <NavBar />
      <Container>
        <Card className="mb-5 mt-5 py-3 px-4 bg-light rounded w-50">
          <h1 className="text-center">Edit User Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className="" onSubmit={handleFormSubmit} >
            <Form.Label className="font-weight-bold" >Display Name:</Form.Label>
            <br />
            <Form.Control className=" form-control-lg" type="text" id="title" onChange={({ target }) => setDisplayName(target.value)} name="displayName" value={displayName} />
            <br />
            <Form.Label className="font-weight-bold">Category:</Form.Label>
            <select className="form-select form-select-lg mb-3 form-control" onChange={({ target }) => setAcctType(target.value)} value={acctType} name="type" >
              <option value="Individual">Personal User</option>
              <option value="Charity">501(c)(3) Charity</option>
              <option value="Organization">Non-501 Organization</option>
            </select>

            <div className="row">
              <div className="col-10">
                <Form.Label className="font-weight-bold" >Item:</Form.Label>
                {/* <Form.Control className="form-control form-control-lg" type="text" id="item" onChange={({ target }) => setItem(target.value)} name="item" placeholder="item" /> */}
                <br />
              </div>

              <div className="col-2">
                <Form.Label className="font-weight-bold" >Quantity:</Form.Label>

                {/* <Form.Control className="form-control form-control-lg" type="number" onChange={({ target }) => setQuantity(target.value)} name="quantity" placeholder="qty" /> */}
              </div>

            </div>

            <div className="row">
              <div className="col-10">
                {/* <Form.Control className="form-control form-control-lg" type="text" id="item" onChange={({ target }) => setItem(target.value)} name="item" placeholder="item" /> */}
                <br />
              </div>
              <div className="col-2">
                {/* <Form.Control className="form-control form-control-lg" type="number" onChange={({ target }) => setQuantity(target.value)} name="quantity" placeholder="qty" /> */}
              </div>
            </div>
            <br />
            <Button id="submit" type="submit" disabled={loading} >Save Changes</Button>

          </Form>
        </Card>
      </Container>
    </>
  )
}