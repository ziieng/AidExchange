import React, { useState, useEffect, useRef } from 'react'
import { Container, Button, Form, Alert, InputGroup } from 'react-bootstrap'
import NavBar from '../Components/NavBar/navbar'
import API from "../utils/API"
import fire from '../firebase.js';
import { useHistory, useParams } from "react-router-dom";

export default function replyForm() {
    // Setting our component's initial state
    const [original, setOriginal] = useState({})
    const [myReply, setMyReply] = useState({})
    const [contentList, setContentList] = useState([{ item: "", quantity: "" }]);
    const selectedItem = useRef()
    const [contents, setContents] = useState([]);
    const [contactMethod, setContactMethod] = useState("");
    const [contactDetail, setContactDetail] = useState("");
    const [postType, setPostType] = useState("Donation");
    const [description, setDescription] = useState("");
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
                if (post.replies[0]) {
                    let mine = post.replies.filter(function (row) {
                        return row.userId === uid
                    })
                    if (mine[0]) {
                        setMyReply(mine[0])
                        setContents(mine[0].contents)
                        let shortList = post.contents.filter((el) => {
                            for (let n = 0; n < mine[0].contents.length; n++) {
                                if (el.item === mine[0].contents[n].item) {
                                    return false
                                }
                            }
                            return true
                        })
                        setContentList(shortList)
                        setContactMethod(mine[0].contactInfo.method)
                        setContactDetail(mine[0].contactInfo.detail)
                    }
                }
            })
            .then(() => {
                setMapRender(true)
            })
    }

    function addItem() {
        let index = selectedItem.current.selectedIndex
        setContents([...contents, { item: contentList[index].item, quantity: "" }])
        setContentError(true)
        let newContentList = contentList
        newContentList.splice(index, 1)
        setContentList(newContentList)
    }

    function handleContentChange(e) {
        let updatedContents = [...contents];
        updatedContents[e.target.dataset.i].quantity = e.target.value;
        setContents(updatedContents);
        updatedContents = contents.filter(function (row) {
            return row.quantity === ""
        })
        if (updatedContents.length > 0) { setContentError(true) } else { setContentError(false) }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        setLoading(true)
        let scrubbedContents = []
        contents.map((line) => {
            if (line.quantity !== "") {
                scrubbedContents.push(line)
            }
            return line
        })
        if (scrubbedContents !== [] && location !== { "lat": 0, "lng": 0 }) {
            let postObj = {
                userId: uid,
                status: "Pending",
                replyType: postType,
                contents: scrubbedContents,
                contactInfo: { method: contactMethod, detail: contactDetail },
                location: location
            }
            if (myReply) {
                API.updateReply(id, postObj)
                    .then(() => {
                        history.push('/listing/' + id)
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage)
                        setError(errorMessage)
                    });
            } else {
                API.addNewReply(id, postObj)
                    .then(() => {
                        history.push('/listing/' + id)
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
                /><a className="linkStyle" href={"/profile/" + original.postBy.userId}>
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
                        <Form.Label className="font-weight-bold" >Items {original.postType}ed:</Form.Label>
                            <InputGroup>
                                <Form.Control as="select" className="form-control-lg" ref={selectedItem} name="itemOption" >
                                    {contentList.map((row, i) => {
                                        return <option key={i}>{row.item}</option>
                                    })}
                                </Form.Control>
                            <InputGroup.Append>
                                <Button id="newItem" type="button" variant="dark" disabled={loading} onClick={addItem}>Add Item</Button>
                            </InputGroup.Append>
                            </InputGroup>
                            <br />
                        </>}
                    <Form.Label className="font-weight-bold">What is the best way for {original.postBy.displayName} to contact you?</Form.Label>
                    <InputGroup>
                        <Form.Control as="select" className="form-control-lg col-lg-4" onChange={({ target }) => setContactMethod(target.value)} value={contactMethod} name="contactMethod" >
                            <option value="Email">Email:</option>
                            <option value="Text or Call">Text or Call:</option>
                            <option value="Call">Call:</option>
                            <option value="Text">Text:</option>
                        </Form.Control>
                        <Form.Control className="form-control form-control-lg col-lg-8" type="text" name="contactDetail" value={contactDetail} onChange={({ target }) => setContactDetail(target.value)} placeholder="any" />
                    </InputGroup>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <br />
                    <Button id="submit" variant="dark" type="submit" to="/" disabled={loading}>Submit</Button>
                    </Form>

                </Container>
            }
        </>
    )
}