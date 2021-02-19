import React, { useState, useEffect } from 'react'
import { Container, Button, Form, Card, Alert } from 'react-bootstrap'
import NavBar from '../Components/NavBar/navbar'
import API from "../utils/API"
import fire from '../firebase.js';
import { useHistory } from "react-router-dom";

export default function editProfile() {
  // Setting our component's initial state
  const [displayName, setDisplayName] = useState("");
  const [acctType, setAcctType] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [links, setLinks] = useState([{ label: "", url: "" }]);
  // const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [linkError, setLinkError] = useState(false);
  const [loading, setLoading] = useState(false);
  let uid = fire.auth().currentUser.uid
  let history = useHistory();

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
        if (userData.links !== []) {
        setLinks(userData.links)
        }
      })
  }

  function addLink() {
    setLinks([...links, { label: "", url: "" }])
    setLinkError(true)
  }

  function handleLinkChange(e) {
    let updatedLinks = [...links];
    updatedLinks[e.target.dataset.i][e.target.dataset.box] = e.target.value;
    setLinks(updatedLinks);
    updatedLinks = links.filter(function (row) {
      return row.label === "" || row.url === ""
    })
    if (updatedLinks.length > 0) { setLinkError(true) } else { setLinkError(false) }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    setLoading(true)

    if (displayName !== "" && acctType !== "") {
      let scrubbedLinks = []
      links.map((line) => {
        if (line.label !== "" && line.url !== "") {
          scrubbedLinks.push(line)
        }
        return line
      })
      API.updateUser({
        userId: uid,
        displayName: displayName,
        acctType: acctType,
        description: description,
        avatar: avatar,
        links: scrubbedLinks
      })
        .then(data => {
          console.log(data)
          history.push('/profile/' + fire.auth().currentUser.uid)
        })
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
            <Form.Control className="form-control-lg" type="text" id="displayName" onChange={({ target }) => setDisplayName(target.value)} name="displayName" value={displayName} />
            <br />
            <Form.Label className="font-weight-bold">Account Type:</Form.Label>
            <Form.Control as="select" className="form-control-lg" onChange={({ target }) => setAcctType(target.value)} value={acctType} name="type" >
              <option value="Individual">Personal User</option>
              <option value="Charity">501(c)(3) Charity</option>
              <option value="Organization">Non-501 Organization</option>
            </Form.Control>
            <br />
            <Form.Label className="font-weight-bold" >Introduction:</Form.Label>
            <br />
            <Form.Control className="form-control-lg" as="textarea" rows={3} id="description" onChange={({ target }) => setDescription(target.value)} name="description" value={description} />
            <br />
            {links.map((row, i) => {
              const labelId = 'label-' + i
              const urlId = 'url-' + i
              return (<div className="row" key={'link-' + i}>
                <div className="col-6">
                  <Form.Label className="font-weight-bold" >Link {i + 1} Label:</Form.Label>
                  <Form.Control className="form-control form-control-lg" type="text" id={labelId} data-box="label" data-i={i} name={labelId} onChange={handleLinkChange} value={links[i].label} placeholder="Website" />
                <br />
              </div>
                <div className="col-6">
                  <Form.Label className="font-weight-bold" >Link {i + 1} URL:</Form.Label>
                  <Form.Control className="form-control form-control-lg" type="text" id={urlId} data-box="url" data-i={i} name={urlId} onChange={handleLinkChange} value={links[i].url} placeholder="http://myradsite.com" />
              </div>
              </div>)
            })}
            {linkError && <Alert variant="warning">Links that don't have BOTH a label and a URL won't be saved.</Alert>}
            <Button id="newLink" type="button" disabled={loading} onClick={addLink}>Add Link</Button>

            <br />
            <Button id="submit" type="submit" disabled={loading} >Save Changes</Button>

          </Form>
        </Card>
      </Container>
    </>
  )
}