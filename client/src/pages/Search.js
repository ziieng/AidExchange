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
    const [listings, setListings] = useState([])
    const [filteredListings, setFilteredListings] = useState([])
    const [filterClothing, setFilterClothing] = useState(true);
    const [filterEquipment, setFilterEquipment] = useState(true);
    const [filterFood, setFilterFood] = useState(true);

    function handleAddrSearch() {
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
            default:
                break;
        }
        let activeCat = []
        void (filterClothing && activeCat.push("Clothing"))
        void (filterEquipment && activeCat.push("Equipment"))
        void (filterFood && activeCat.push("Food"))
        let shortList = listings.filter((el) => activeCat.includes(el.category))
        setFilteredListings(shortList)
    }

    function resetFilter() {
        setFilterClothing(true)
        setFilterEquipment(true)
        setFilterFood(true)
        handleFilter("")
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
                            <Button id='find' variant="outline-secondary" onClick={handleAddrSearch}>Find <FaSearchLocation /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {addrError && <Alert variant="danger">Address not recognized.</Alert>}
                </Card.Body>
            </Card>
            <Card className='filter' >
                <Card.Body>
                    <Form>
                        <h2> Categories: </h2>
                        {/* <Button className='apply' variant="dark">Apply</Button> */}
                        <div id="filterArray" className="font-weight-bold mb-3">
                            <Form.Check
                                type="switch"
                                id="clothing-filter"
                                label='Clothing'
                                checked={filterClothing}
                                onClick={() => handleFilter("Clothing")}
                            />
                            <Form.Check
                                type="switch"
                                id="equipment-filter"
                                label='Equipment'
                                checked={filterEquipment}
                                onClick={() => handleFilter("Equipment")}
                            />
                            <Form.Check
                                type="switch"
                                id="food-filter"
                                label='Food'
                                checked={filterFood}
                                onClick={() => handleFilter("Food")}
                            />
                        </div>
                        <Button size="sm" className='clear' variant="dark" onClick={resetFilter}>Reset</Button>
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