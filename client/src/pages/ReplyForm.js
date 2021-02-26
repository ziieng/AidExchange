import React, { useState, useEffect, useRef } from 'react'
import { Container, Button, Form, Alert, InputGroup } from 'react-bootstrap'
import NavBar from '../Components/NavBar/navbar'
import API from "../utils/API"
import fire from '../firebase.js';
import { useHistory, useParams } from "react-router-dom";
import MyMapComponent from "../Components/Map";
import GeoSearch from "../utils/GeoCodeSearch"
import { FaSearchLocation } from "react-icons/fa"

export default function replyForm() {
    // Setting our component's initial state
    const [original, setOriginal] = useState({})
    const [contentList, setContentList] = useState([{ item: "", quantity: "" }]);
    const selectedItem = useRef()
    const [contents, setContents] = useState([]);
    const [postType, setPostType] = useState("Donation");
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
        loadListing()
    }, [])

    function loadListing() {
        API.getListing(id)
            .then(res => {
                console.log(res)
                let post = res.data
                setOriginal(post)
                setPostType((post.postType === "Request") ? "Donation" : "Request")
                setContentList(post.contents)
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
        let index = selectedItem.current.selectedIndex
        console.log(selectedItem.current.selectedIndex)
        setContents([...contents, { item: contentList[index].item, quantity: "" }])
        setContentError(true)
        let newContentList = contentList
        newContentList.splice(index, 1)
        setContentList(newContentList)
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
        setLoading(true)
        let scrubbedContents = []
        contents.map((line) => {
            if (line.item !== "" && line.quantity !== "") {
                scrubbedContents.push(line)
            }
            return line
        })
        if (scrubbedContents !== [] && location !== { "lat": 0, "lng": 0 }) {
            let postObj = {
                userId: uid,
                status: "open",
                postType: postType,
                contents: scrubbedContents,
                location: location,
                description: description,
            }
            // if (version === "Edit") {
            //     API.updateListing(id, postObj)
            //         .then(() => {
            //             history.push('/listing/' + id)
            //         })
            //         .catch((error) => {
            //             var errorCode = error.code;
            //             var errorMessage = error.message;
            //             console.log(errorCode, errorMessage)
            //             setError(errorMessage)
            //         });
            // } else if (version === "New") {
            //     API.addNewListing(postObj)
            //         .then(data => {
            //             history.push('/listing/' + data.data._id)
            //         })
            //         .catch((error) => {
            //             var errorCode = error.code;
            //             var errorMessage = error.message;
            //             console.log(errorCode, errorMessage)
            //             setError(errorMessage)
            //         });
            // }
        } else {
            setError("Title, Category, Location, and Contents required!")
        }
        setLoading(false)
    }

    return (
        <>
            <NavBar />
            {mapRender &&
                <Container className="mb-5 mt-5 py-3 px-4 bg-light rounded w-50">
                    <h3 className="text-center">Replying to:<br />"{original.title}"</h3>
                    <h5 className="text-center"><img
                        className="tinyIcon"
                        src={original.postBy.avatar}
                        alt={"user profile image for " + original.postBy.displayName}
                    /><a href={"/profile/" + original.postBy.userId}>
                            {original.postBy.displayName}
                        </a></h5>

                    <Form className="" onSubmit={handleFormSubmit} >
                        <br />
                        <Form.Label className="font-weight-bold">Category: {original.category}</Form.Label>
                        <br />
                        <Form.Label className="font-weight-bold">Type of Post: {original.postType}</Form.Label>
                        <br />
                        <Form.Label className="font-weight-bold">Type of Reply: {postType}</Form.Label>
                        <br />
                        {original.description && <>
                            <Form.Label className="font-weight-bold" >Description:</Form.Label>
                            <br />
                            <Form.Label className="font-weight-bold" >{description}</Form.Label>
                            <br />
                        </>}
                        {contents.map((row, i) => {
                            const itemId = 'item-' + i
                            const qtyId = 'qty-' + i
                            return (<div className="row" key={'line-' + i}>
                                <div className="col-6">
                                    <Form.Label className="font-weight-bold" >Item {i + 1} Description:</Form.Label>
                                    <Form.Control className="form-control form-control-lg" type="text" id={itemId} data-box="item" data-i={i} name={itemId} value={contents[i].item} disabled={true} placeholder="Things" />
                                    <br />
                                </div>
                                <div className="col-6">
                                    <Form.Label className="font-weight-bold" >Item {i + 1} {postType}:</Form.Label>
                                    <Form.Control className="form-control form-control-lg" type="text" id={qtyId} data-box="quantity" data-i={i} name={qtyId} value={contents[i].quantity} onChange={handleContentChange} placeholder="any" />
                                </div>
                            </div>)
                        })}
                        {contentError && <Alert variant="warning">Rows that don't have a specified {postType.toLowerCase()} won't be saved.</Alert>}
                        {contentList[0] && <>
                            <InputGroup>
                                <Form.Control as="select" className="form-control-lg" ref={selectedItem} name="itemOption" >
                                    {contentList.map((row, i) => {
                                        return <option key={i}>{row.item}</option>
                                    })}
                                </Form.Control>
                                <Button id="newItem" type="button" disabled={loading} onClick={addItem}>Add Item</Button>
                            </InputGroup>
                            <br />
                        </>}
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
                        <Button id="submit" type="submit" to="/" disabled={loading}>Submit</Button>
                    </Form>

                </Container>
            }
        </>
    )
}