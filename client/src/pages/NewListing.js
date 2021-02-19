import React, { useState } from 'react'
import { Container, Button, Form, Alert } from 'react-bootstrap'
import NavBar from '../Components/NavBar/navbar'
import API from "../utils/API"
import fire from '../firebase.js';
import { useHistory } from "react-router-dom";

export default function newlisting() {
    // Setting our component's initial state
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [contents, setContents] = useState([{ item: "", quantity: "" }]);
    const [postType, setPostType] = useState("Request");
    const [description, setDescription] = useState("");
    // const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const [contentError, setContentError] = useState(true);
    const [loading, setLoading] = useState(false);
    let uid = fire.auth().currentUser.uid
    let history = useHistory();

    //Refresh the page 
    const refreshPage = () => {
        window.location.reload();
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
        if (title !== "" && category !== "" && postType !== "" && scrubbedContents !== []) {
            API.addNewListing({
                userId: uid,
                title: title,
                category: category,
                status: "open",
                postType: postType,
                contents: scrubbedContents,
                description: description,
            })
                .then(data => {
                    console.log(data)
                    history.push('/profile/' + data.data._id)
                })
                .then(data => {
                    console.log(data)
                    // history.push('/profile/' + data._id)
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    setError(errorMessage)
                });
        } else {
            setError("Title, Category, and Contents required!")
        }
        setLoading(false)
    }

    return (
        <>
            <NavBar />
            <Container className="mb-5 mt-5 py-3 px-4 bg-light rounded w-50">
                <h1 className="text-center">New Listing</h1>

                <Form className="" onSubmit={handleFormSubmit} >
                    <Form.Label className="font-weight-bold" >Title:</Form.Label>
                    <br />

                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Control className=" form-control-lg" type="text" id="title" onChange={({ target }) => setTitle(target.value)} name="title" placeholder="Aid Request/Offer" />
                    <br />
                    <Form.Label className="font-weight-bold">Category:</Form.Label>
                    <Form.Control as="select" className="form-control-lg" onChange={({ target }) => setCategory(target.value)} name="type" >
                        <option value="">Type of Things</option>
                        <option value="Clothing">Clothes</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Food">Food</option>
                    </Form.Control>
                    <br />
                    <Form.Label className="font-weight-bold">Type of Post:</Form.Label>
                    <Form.Control as="select" className="form-control-lg" onChange={({ target }) => setPostType(target.value)} name="type" >
                        <option value="Request">Request</option>
                        <option value="Offer">Offer</option>
                    </Form.Control>
                    <br />
                    <Form.Label className="font-weight-bold" >Description:</Form.Label>
                    <br />
                    <Form.Control className="form-control-lg" as="textarea" rows={3} id="description" onChange={({ target }) => setDescription(target.value)} name="description" placeholder="Is there anything folks need to know?" />
                    <br />
                    {contents.map((row, i) => {
                        const itemId = 'item-' + i
                        const qtyId = 'qty-' + i
                        return (<div className="row" key={'line-' + i}>
                            <div className="col-6">
                                <Form.Label className="font-weight-bold" >Item {i + 1} Description:</Form.Label>
                                <Form.Control className="form-control form-control-lg" type="text" id={itemId} data-box="item" data-i={i} name={itemId} onChange={handleContentChange} placeholder="Things" />
                                <br />
                            </div>
                            <div className="col-6">
                                <Form.Label className="font-weight-bold" >Item {i + 1} Quantity:</Form.Label>
                                <Form.Control className="form-control form-control-lg" type="text" id={qtyId} data-box="quantity" data-i={i} name={qtyId} onChange={handleContentChange} placeholder="any" />
                            </div>
                        </div>)
                    })}
                    {contentError && <Alert variant="warning">Items that don't have BOTH a label and a quantity won't be saved.</Alert>}
                    <Button id="newItem" type="button" disabled={loading} onClick={addItem}>Add Item</Button>
                    <br />
                    {/* <Form.Label className="font-weight-bold" >Location:</Form.Label>
                    <br />
                    <Form.Control className="form-control form-control-lg" type="text" id="location" onChange={({ target }) => setLocation(target.value)} name="location" placeholder="location" />
                    <br /> */}
                    <Button id="submit" type="submit" onClick={refreshPage} to="/" disabled={loading}>Submit</Button>

                </Form>

            </Container>
        </>
    )
}