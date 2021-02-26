import React, { useState } from 'react';
import { Card, InputGroup, Alert, FormControl, Button, Table, Form } from 'react-bootstrap';
import TopNav from '../Components/NavBar/navbar';
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

    function handleAddrSearch() {
        if (addr !== "") {
            setLoading(true)
            GeoSearch.coordsFromAddr(addr)
                .then((coords) => {
                    setLocation(coords)
                    setAddrError(false)
                    postSearch(coords)
                })
                .catch(() => {
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
            .catch(
                setListings([])
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
            < TopNav />
            <div className='searchForm'>
                <Card.Body>
                    <h4> Search by address, city, or zip code:</h4>
                    <InputGroup className="mb-3">
                        <Form.Control className="form-control form-control-lg" type="text" id="location" onChange={({ target }) => setAddr(target.value)} name="location" placeholder="Location" />
                        <InputGroup.Append>
                            <Button id='find' variant="outline-secondary" onClick={handleAddrSearch} disabled={loading}>Find <FaSearchLocation /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {addrError && <Alert variant="danger">Address not recognized.</Alert>}
                </Card.Body>
            </div>
            <Card className='filter' >
                <Card.Body>
                    <Form>
                        <h3> Categories to Display: </h3>
                        {/* <Button className='apply' variant="dark">Apply</Button> */}
                        <div id="filterArray" className="font-weight-bold mb-3">
                            <Form.Check
                                type="switch"
                                id="clothing-filter"
                                label='Clothing'
                                disabled={loading}
                                checked={filterClothing}
                                onChange={() => handleFilter("Clothing")}
                            />
                            <Form.Check
                                type="switch"
                                id="equipment-filter"
                                label='Equipment'
                                disabled={loading}
                                checked={filterEquipment}
                                onChange={() => handleFilter("Equipment")}
                            />
                            <Form.Check
                                type="switch"
                                id="food-filter"
                                label='Food'
                                disabled={loading}
                                checked={filterFood}
                                onChange={() => handleFilter("Food")}
                            />
                        </div>
                        <div className='btnFormat'>
                            <Button className='clear' variant="dark" onClick={() => handleFilter("Reset")} disabled={loading}>Reset</Button>
                            <Button className='apply' variant="dark" onClick={() => handleFilter("Apply")} disabled={loading}>Apply</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className='data'>
                <Card.Body>
                    <h2> Search Results: </h2>
                    {filteredListings.length ? (
                        <>
                            {filteredListings.map((post) => {
                                return <Listing key={post._id} value={post} uid={uid} />;
                            })}
                        </>
                    ) : (
                            <h5>No Results to Display</h5>
                        )}
                </Card.Body>
            </div>
        </>
    );
}