import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap'
import NavBar from '../Components/NavBar/navbar'

export default function newlisting() {
    return (
        <>
            <NavBar />
            <Container className="mb-5 mt-5 py-3 px-4 bg-light rounded w-50">
                <h1 className="text-center">New Listing</h1>

                <Form className="" >
                    <Form.Label className="font-weight-bold" for="title">Title:</Form.Label>
                    <br />
                    <Form.Control className="form-control form-control-lg" type="text" id="title" name="title" placeholder="title" />
                    <br />
                    <Form.Label className="font-weight-bold" for="catagory">Catagory:</Form.Label>
                    <select className="form-select form-select-lg mb-3 form-control" name="type" >
                        <option value="">Type</option>
                        <option value="1">Clothes</option>
                        <option value="2">Equipment</option>
                        <option value="3">Food</option>
                    </select>

                    <div className="row">
                        <div className="col-10">
                            <Form.Label className="font-weight-bold" for="catagory">Item:</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" id="item" name="item" placeholder="item" />
                            <br />
                        </div>

                        <div className="col-2">
                            <Form.Label className="font-weight-bold" for="catagory">Quantity:</Form.Label>

                            <Form.Control className="form-control form-control-lg" type="number" placeholder="qty" />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-10">
                            <Form.Control className="form-control form-control-lg" type="text" id="item" name="item" placeholder="item" />
                            <br />
                        </div>
                        <div className="col-2">
                            <Form.Control className="form-control form-control-lg" type="number" placeholder="qty" />
                        </div>
                    </div>
                    <Form.Label className="font-weight-bold" for="location">Location:</Form.Label>
                    <br />
                    <Form.Control className="form-control form-control-lg" type="text" id="location" name="location" placeholder="location" />
                    <br />
                    <Button id="submit" type="submit" to="/" className="">Submit</Button>

                </Form>

            </Container>
        </>
    )
}