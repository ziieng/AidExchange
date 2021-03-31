import React, { useState, useEffect } from 'react'
import { Container, Button, Form, Alert, InputGroup } from 'react-bootstrap'
import API from "../utils/API"
import fire from '../firebase.js';
import { useHistory, useParams } from "react-router-dom";
import MyMapComponent from "../Components/Map";
import GeoSearch from "../utils/GeoCodeSearch"
import { FaSearchLocation } from "react-icons/fa"

export default function editListing(props) {
    const version = props.version
    // Setting our component's initial state
    const [owner, setOwner] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [contents, setContents] = useState([{ item: "", quantity: "" }]);
    const [postType, setPostType] = useState("Request");
    const [description, setDescription] = useState("");
    const [addr, setAddr] = useState("")
    const [addrError, setAddrError] = useState(false)
    const [location, setLocation] = useState({ "lat": 0, "lng": 0 })
    const [mapRender, setMapRender] = useState(false)
    const [error, setError] = useState("");
    const [contentError, setContentError] = useState(false);
    const [loading, setLoading] = useState(false);
    let uid = fire.auth().currentUser.uid
    let { id } = useParams()
    let history = useHistory();

    useEffect(() => {
        if (version === "Edit") {
            loadListing()
        } else if (version === "New") {
            loadUserLocation()
        }
    }, [])

    function ownerCheck(userId) {
        setOwner(userId)
        if (userId !== uid) {
            setError("!! Only a post's creator can edit it. !!")
        }
    }

    function loadListing() {
        API.getListing(id)
            .then(res => {
                console.log(res)
                let post = res.data
                ownerCheck(post.userId)
                setTitle(post.title)
                setCategory(post.category)
                setContents(post.contents)
                setPostType(post.postType)
                setDescription(post.description)
                if (post.location) {
                    setLocation({
                        lat: post.location.coordinates[1],
                        lng: post.location.coordinates[0],
                    })
                }
            })
            .then(() => {
                setMapRender(true)
            })
    }

    function loadUserLocation() {
        API.getUser(uid)
            .then(res => {
                console.log(res)
                if (res.data.location) {
                    setLocation({ "lat": res.data.location.coordinates[1], "lng": res.data.location.coordinates[0] })
                } else {
                    setLocation({ "lat": 0, "lng": 0 })
                }
            })
            .then(() => {
                setMapRender(true)
            })
    }

    function addItem() {
        setContents([...contents, { item: "", quantity: "" }])
        setContentError(true)
    }

    function handleContentChange(e) {
        let updatedContents = [...contents];
        updatedContents[e.target.dataset.i][e.target.dataset.box] = e.target.value;
        setContents(updatedContents);
        updatedContents = contents.filter(function (row) {
            return row.item === "" || row.quantity === ""
        })
        if (updatedContents.length > 0) { setContentError(true) } else { setContentError(false) }
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

    function handleFormSubmit(event) {
        event.preventDefault();
        if (version === "Edit" && uid !== owner) {
            setError("Only a post's creator can edit it.")
        } else {
        setLoading(true)
        let scrubbedContents = []
        contents.map((line) => {
            if (line.item !== "" && line.quantity !== "") {
                scrubbedContents.push(line)
            }
            return line
        })
        if (title !== "" && category !== "" && postType !== "" && scrubbedContents !== [] && location !== { "lat": 0, "lng": 0 }) {
            let postObj = {
                userId: uid,
                title: title,
                category: category,
                status: "open",
                postType: postType,
                contents: scrubbedContents,
                location: location,
                description: description,
            }
            if (version === "Edit") {
                API.updateListing(id, postObj)
                    .then(() => {
                        history.push('/listing/' + id)
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage)
                        setError(errorMessage)
                    });
            } else if (version === "New") {
                API.addNewListing(postObj)
                    .then(data => {
                        history.push('/listing/' + data.data._id)
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage)
                        setError(errorMessage)
                    });
            }
        } else {
            setError("Title, Category, Location, and Contents required!")
        }
            setLoading(false)
        }
    }

    return (
        <>
            <Container className="mb-5 mt-5 py-3 px-4 bg-light rounded col-lg-6">
                <h1 className="text-center">{version} Listing</h1>

                <Form autoComplete="off" className="" onSubmit={handleFormSubmit} >
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Label className="font-weight-bold" >Title:</Form.Label>
                    <br />
                    <Form.Control className=" form-control-lg" type="text" id="title" value={title} onChange={({ target }) => setTitle(target.value)} name="title" placeholder="Aid Request/Offer" />
                    <br />
                    <Form.Label className="font-weight-bold">Category:</Form.Label>
                    <Form.Control as="select" className="form-control-lg" value={category} onChange={({ target }) => setCategory(target.value)} name="type" >
                        <option value="Clothing">Clothing</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Food">Food</option>
                    </Form.Control>
                    <br />
                    <Form.Label className="font-weight-bold">Type of Post:</Form.Label>
                    <Form.Control as="select" className="form-control-lg" onChange={({ target }) => setPostType(target.value)} value={postType} name="type" >
                        <option value="Request">Request</option>
                        <option value="Offer">Offer</option>
                    </Form.Control>
                    <br />
                    <Form.Label className="font-weight-bold" >Description:</Form.Label>
                    <br />
                    <Form.Control className="form-control-lg" as="textarea" rows={3} id="description" value={description} onChange={({ target }) => setDescription(target.value)} name="description" placeholder="Is there anything folks need to know?" />
                    <br />
                    {contents.map((row, i) => {
                        const itemId = 'item-' + i
                        const qtyId = 'qty-' + i
                        return (<div className="row" key={'line-' + i}>
                            <div className="col-6">
                                <Form.Label className="font-weight-bold" >Item {i + 1} Description:</Form.Label>
                                <Form.Control className="form-control form-control-lg" type="text" id={itemId} data-box="item" data-i={i} name={itemId} value={contents[i].item} onChange={handleContentChange} placeholder="Things" />
                                <br />
                            </div>
                            <div className="col-6">
                                <Form.Label className="font-weight-bold" >Item {i + 1} Quantity:</Form.Label>
                                <Form.Control className="form-control form-control-lg" type="text" id={qtyId} data-box="quantity" data-i={i} name={qtyId} value={contents[i].quantity} onChange={handleContentChange} placeholder="any" />
                            </div>
                        </div>)
                    })}
                    {contentError && <Alert variant="warning">Items that don't have BOTH a label and a quantity won't be saved.</Alert>}
                    <Button id="newItem" type="button" disabled={loading} onClick={addItem}>Add Item</Button>
                    <br />
                    <Form.Label className="font-weight-bold" >Location:</Form.Label>
                    <br />
                    <InputGroup className="mb-3">
                        <Form.Control className="form-control form-control-lg" type="text" id="location" onChange={({ target }) => setAddr(target.value)} name="location" placeholder="location" />
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
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Button id="submit" type="submit" to="/" disabled={loading}>{(version === "New") ? "Submit" : "Update"}</Button>
                </Form>

            </Container>
        </>
    )
}