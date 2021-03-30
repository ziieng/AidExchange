import React, { useState } from 'react';
import { Card, InputGroup, Alert, Button, Form, Container, Col, Row } from 'react-bootstrap';
import Listing from '../Components/Cards/listing'
import GeoSearch from "../utils/GeoCodeSearch"
import API from "../utils/API"
import fire from "../firebase.js";
import { FaSearchLocation } from "react-icons/fa"

export default function Search() {
    const [addr, setAddr] = useState("")
    const [addrError, setAddrError] = useState(false)
    const [location, setLocation] = useState({ "lat": 0, "lng": 0 })
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([])
    const [filteredListings, setFilteredListings] = useState([])
    const [filterClothing, setFilterClothing] = useState(true);
    const [filterEquipment, setFilterEquipment] = useState(true);
    const [filterFood, setFilterFood] = useState(true);
    let uid = fire.auth().currentUser.uid;

    function handleAddrSearch(event) {
        event.preventDefault()
        if (addr !== "") {
            setLoading(true)
            GeoSearch.coordsFromAddr(addr)
                .then((coords) => {
                    setLocation(coords)
                    setAddrError(false)
                    postSearch(coords)
                })
                .catch((err) => {
                    console.error(err)
                    setAddrError(true)
                    setLoading(false)
                })
        } else {
            setAddrError(true)
        }
    }

    function postSearch(coords) {
        API.searchNear(coords)
            .then((res) => {
                setListings(res.data);
                doFilter(res.data)
            })
            .catch(() => {
                setListings([])
                setLoading(false)
            }
            )
    }

    function doFilter(array) {
        let activeCat = []
        void (filterClothing && activeCat.push("Clothing"))
        void (filterEquipment && activeCat.push("Equipment"))
        void (filterFood && activeCat.push("Food"))
        let shortList = array.filter(function (el) {
            return activeCat.includes(el.category)
        })
        setLoading(false)
        setFilteredListings(shortList)
    }

    function handleFilter(type) {
        switch (type) {
            case "Clothing":
                setFilterClothing(!filterClothing)
                break;
            case "Equipment":
                setFilterEquipment(!filterEquipment)
                break;
            case "Food":
                setFilterFood(!filterFood)
                break;
            case "Reset":
                setFilterClothing(true)
                setFilterEquipment(true)
                setFilterFood(true)
                setFilteredListings(listings)
                break;
            case "Apply":
                doFilter(listings)
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Container fluid style={{
                minHeight: "85vh"
            }}>
                <Row>
                    <div className='searchForm w-100 p-3'>
                        <Form onSubmit={handleAddrSearch}>
                            <h4> Search by address, city, or zip code:</h4>
                            <InputGroup className="mb-1">
                                <Form.Control className="form-control form-control-lg" type="text" id="location" onChange={({ target }) => setAddr(target.value)} name="location" placeholder="Location" />
                                <InputGroup.Append>
                                    <Button id='find' type="submit" variant="outline-secondary" disabled={loading}>Find <FaSearchLocation /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                            {addrError && <Alert variant="danger">Address not recognized.</Alert>}
                        </Form>
                    </div></Row>
                <Row className="w-100">
                    <Col className="col-md-4 col-12">
                        <Card className='sticky-top' >
                            <Card.Body>
                                <Form>
                                    <h5> Categories to Display: </h5>
                                    <div id="filterArray" className="font-weight-bold mb-3">
                                        <Form.Switch
                                            id="clothing-filter"
                                            label='Clothing'
                                            disabled={loading}
                                            checked={filterClothing}
                                            onChange={() => handleFilter("Clothing")}
                                        />
                                        <Form.Switch
                                            id="equipment-filter"
                                            label='Equipment'
                                            disabled={loading}
                                            checked={filterEquipment}
                                            onChange={() => handleFilter("Equipment")}
                                        />
                                        <Form.Switch
                                            id="food-filter"
                                            label='Food'
                                            disabled={loading}
                                            checked={filterFood}
                                            onChange={() => handleFilter("Food")}
                                        />
                                    </div>
                                    <div className='btn-toolbar'>
                                        <Button className='mr-2' variant="dark" onClick={() => handleFilter("Reset")} disabled={loading}>Reset</Button>
                                        <Button variant="dark" onClick={() => handleFilter("Apply")} disabled={loading}>Apply</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mt-0'>
                        <Row><h2> Search Results: </h2></Row>
                        <Row>
                        {filteredListings.length ? (
                            <>
                                {filteredListings.map((post) => {
                                    return <Listing key={post._id} value={post} uid={uid} />;
                                })}
                            </>
                        ) : (
                                <h5>No Results to Display</h5>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}