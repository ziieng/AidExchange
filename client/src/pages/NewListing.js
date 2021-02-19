import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap'
import NavBar from '../Components/NavBar/navbar'
import API from "../utils/API"
// import fire from '../firebase.js';
// import { useAuth } from '../contexts/AuthContext'

export default function NewListing() {

    const refreshPage = () => {
        window.location.reload();
    }

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [item, setItem] = useState("");
    const [quantity, setQuantity] = useState("");
    const [content, setContent] = useState([]);
    const [postType, setPostType] = useState("Request")
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    // const history = useHistory();

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(item, quantity)

        setContent({ item: item, quantity: quantity })
        API.addNewListing({
            title: title,
            category: category,
            content: content,
            // item: item,
            // quantity: quantity,
            location: location,
            postType: postType
        })
            .then(data => console.log(data))
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setError(errorMessage)

            });

    }

    return (
        <>
            <NavBar />
            <Container className="mb-5 mt-5 py-3 px-4 bg-light rounded w-50">
                <h1 className="text-center">New Listing</h1>

                <Form className="" onSubmit={handleFormSubmit} >
                    <Form.Label className="font-weight-bold" >Title:</Form.Label>
                    <br />
                    <Form.Control className=" form-control-lg" type="text" id="title" onChange={({ target }) => setTitle(target.value)} name="title" placeholder="title" />
                    <br />
                    <Form.Label className="font-weight-bold" >PostType:</Form.Label>
                    <br />
                    <Form.Control className=" form-control-lg" type="text" id="postType" onChange={({ target }) => setPostType(target.value)} name="posttype" placeholder="post-type" />
                    <br />
                    <Form.Label className="font-weight-bold">Category:</Form.Label>
                    <select className="form-select form-select-lg mb-3 form-control" onChange={({ target }) => setCategory(target.value)} name="category" >
                        <option value="">Type</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Food">Food</option>
                    </select>

                    <div className="row">
                        <div className="col-10">
                            <Form.Label className="font-weight-bold" >Item:</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" id="item" onChange={({ target }) => setItem(target.value)} name="item" placeholder="item" />
                            <br />
                        </div>

                        <div className="col-2">
                            <Form.Label className="font-weight-bold" >Quantity:</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="number" onChange={({ target }) => setQuantity(target.value)} name="quantity" placeholder="qty" />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-10">
                            <Form.Control className="form-control form-control-lg" type="text" id="item" onChange={({ target }) => setItem(target.value)} name="item" placeholder="item" />
                            <br />
                        </div>
                        <div className="col-2">
                            <Form.Control className="form-control form-control-lg" type="number" onChange={({ target }) => setQuantity(target.value)} name="quantity" placeholder="qty" />
                        </div>
                    </div>

                    <Form.Label className="font-weight-bold" >Location:</Form.Label>
                    <br />
                    <Form.Control className="form-control form-control-lg" type="text" id="location" onChange={({ target }) => setLocation(target.value)} name="location" placeholder="location" />
                    <br />
                    <Button id="submit" onClick={refreshPage} type="submit" to="/" >Submit</Button>

                </Form>

            </Container>
        </>
    )
}