import React, { useState } from 'react';
import { Card, InputGroup, Alert, FormControl, Button, Table, Form } from 'react-bootstrap';
import TopNav from '../Components/NavBar/navbar';
import Listing from '../Components/Cards/listing'
import GeoSearch from "../utils/GeoCodeSearch"
import API from "../utils/API"
import { FaSearchLocation } from "react-icons/fa"

export default function Search() {
    const [addr, setAddr] = useState("")
    const [addrError, setAddrError] = useState(false)
    const [location, setLocation] = useState({ "lat": 0, "lng": 0 })
    const [loading, setLoading] = useState(false);
    const [filterClothing, setFilterClothing] = useState(true);
    const [filterEquipment, setFilterEquipment] = useState(true);
    const [filterFood, setFilterFood] = useState(true);

    function handleSearch() {
        if (addr !== "") {
            setLoading(true)
            GeoSearch.coordsFromAddr(addr)
                .then((coords) => {
                    console.log(coords)
                    setLocation(coords)
                    setAddrError(false)
                    setLoading(false)
                })
                .catch()
        } else {
            setAddrError(true)
        }
    }

    function resetFilter() {
        setFilterClothing(true)
        setFilterEquipment(true)
        setFilterFood(true)
    }

    return (
        <>
            < TopNav />
            <Card className='searchForm'>
                <Card.Body>
                    <h3> Enter an address, city, or zip code to search nearby</h3>
                    <InputGroup className="mb-3">
                        <Form.Control className="form-control form-control-lg" type="text" id="location" onChange={({ target }) => setAddr(target.value)} name="location" placeholder="location" />
                        <InputGroup.Append>
                            <Button id='find' variant="outline-secondary" onClick={handleSearch}>Find <FaSearchLocation /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {addrError && <Alert variant="danger">Address not recognized.</Alert>}
                </Card.Body>
            </Card>
            <Card className='filter' >
                <Card.Body>
                    <Form>
                        <h2> Category: </h2>
                        <Button className='clear' variant="dark" onClick={resetFilter}>Reset</Button>
                        <Button className='apply' variant="dark">Apply</Button>
                        <div id="flterArray">
                                <Form.Check
                                type="checkbox"
                                id="clothing-filter"
                                label='Clothing'
                                checked={filterClothing}
                                onClick={setFilterClothing(!filterClothing)}
                                />
                                <Form.Check
                                type="checkbox"
                                id="equipment-filter"
                                label='Equipment'
                                checked={filterEquipment}
                                onClick={setFilterEquipment(!filterEquipment)}
                                />
                                <Form.Check
                                type="checkbox"
                                id="food-filter"
                                label='Food'
                                checked={filterFood}
                                onClick={setFilterFood(!filterFood)}
                            />
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <Card className='data'>
                <Card.Body>
                    <h2> Search Results: </h2>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                {/* < Listing />
                                < Listing /> */}
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
}