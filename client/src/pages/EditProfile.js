import React, { useState, useEffect } from 'react'
import { Container, Button, Form, Card, Alert, InputGroup } from 'react-bootstrap'
import NavBar from '../Components/NavBar/navbar'
import API from "../utils/API"
import fire, { storage } from '../firebase.js';
import { useHistory } from "react-router-dom";
import MyMapComponent from "../Components/Map";
import GeoSearch from "../utils/GeoCodeSearch"
import { FaSearchLocation, FaUpload } from "react-icons/fa"

export default function editProfile() {
  // Setting our component's initial state
  const [displayName, setDisplayName] = useState("");
  const [acctType, setAcctType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [imageError, setimageError] = useState("");
  const [links, setLinks] = useState([{ label: "", url: "" }]);
  const [addr, setAddr] = useState("")
  const [addrError, setAddrError] = useState(false)
  const [location, setLocation] = useState({ "lat": 0, "lng": 0 })
  const [mapRender, setMapRender] = useState(false)
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
          if (res.data.location) {
            let locationArray = res.data.location.coordinates
            setLocation({ "lat": locationArray[1], "lng": locationArray[0] })
          }
        }
      })
      .then(() => {
        if (location !== { "lat": 0, "lng": 0 }) {
        setMapRender(true)
        }
      })
  }

  function handleSearch() {
    if (addr !== "") {
      setMapRender(false)
      GeoSearch.coordsFromAddr(addr)
        .then((coords) => {
          console.log(coords)
          setLocation(coords)
          setAddrError(false)
          setMapRender(true)
        })
        .catch()
    } else {
      setAddrError(true)
    }
  }

  const handleFileChange = e => {
    if (e.target.files[0]) {
      let file = e.target.files[0]
      //file extension validation from https://www.geeksforgeeks.org/file-type-validation-while-uploading-it-using-javascript/
      var allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(file.name)) {
        setimageError('Invalid file type');
        e.target.value = "";
        return false;
      }
      else {
        let size = Math.round((file.size / 1024))
        if (size >= 500) {
          setimageError("File too large, please select an image smaller than 500KB.")
          e.target.value = "";
          return false
        }
        setImage(file);
        setimageError("")
      }

    }
  };

  const handleUpload = () => {
    if (image !== null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const done = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(done);

        },
        error => {
          setimageError(error)
          console.error(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setAvatar(url);
            });
        }
      );
    }
  };

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
        location: location,
        links: scrubbedLinks
      })
        .then(data => {
          console.log(data)
          history.push('/profile/' + uid)
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
            <Form.Label className="font-weight-bold" >Avatar Image:<img
              style={{ height: "80px", width: "80px" }}
              src={avatar}
              alt={"user profile image preview for " + displayName}
            />  <img
                style={{ height: "40px", width: "40px" }}
                src={avatar}
                alt={"smaller user profile image preview for " + displayName}
          /></Form.Label>
            <br /><Form.Label>Select New Avatar (.jpg, .jpeg, .png, or .gif)</Form.Label><br />
            <InputGroup>
              <Form.File id="avatarFile" className="form-control" onChange={handleFileChange} />
              <InputGroup.Append>
                <Button id='find' variant="dark" onClick={handleUpload}>Upload <FaUpload /></Button>
              </InputGroup.Append>
            </InputGroup>
            {(progress === 100) && <Alert variant="warning">You must click "Save Changes" at the bottom of this screen for image change to take effect.</Alert>}
            {imageError && <Alert variant="danger">{imageError}</Alert>}
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
            <Button id="newLink" type="button" variant="dark" disabled={loading} onClick={addLink}>Add Link</Button>
            <br />
            <br />
            <Form.Label className="font-weight-bold" >Default Post Location:</Form.Label>
            <br />
            <InputGroup className="mb-3">
              <Form.Control className="form-control form-control-lg" type="text" id="location" onChange={({ target }) => setAddr(target.value)} name="location" placeholder="New location? Search by address." />
              <InputGroup.Append>
                <Button id='find' variant="outline-secondary" onClick={handleSearch}>Find <FaSearchLocation /></Button>
              </InputGroup.Append>
            </InputGroup>
            {addrError && <Alert variant="danger">Address not recognized.</Alert>}
            <br />
            <div className="listMap" style={{ height: "300px", width: "300px" }}>
              {mapRender && <MyMapComponent isMarkerShown={true} coords={location} />}
            </div>
            <br />
            <Button id="submit" type="submit" variant="dark" disabled={loading} >Save Changes</Button>

          </Form>
        </Card>
      </Container>
    </>
  )
}