import React from 'react';
import { Card, FormControl, Button, Table, Form } from 'react-bootstrap';
import TopNav from '../Components/NavBar/navbar';
import Listing from '../Components/Cards/listing'


export default function Search() {
    return (
        <>
            < TopNav />
            <Card className='searchForm'>
                <Card.Body>
                    <h3> Enter a zip code to search, or (search by my location)</h3>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                        <Button type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card className='filter' >
                <Card.Body>
                    <Form>
                    <h2> Filter: </h2>
                        <Button className='clear' variant="dark">Clear</Button>
                        <Button className='apply' variant="dark">Apply</Button>
                        {['checkbox'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                    type={type}
                                    id={`default-${type}`}
                                    label={`Clothes ${type}`}
                                />
                                <Form.Check
                                    type={type}
                                    id={`default-${type}`}
                                    label={`Tools ${type}`}
                                />
                                <Form.Check
                                    type={type}
                                    id={`default-${type}`}
                                    label={`Food ${type}`}
                                />

                            </div>
                        ))}
                    </Form>
                </Card.Body>
            </Card>
            <Card className='data'>
                <Card.Body>
                    <h2> Search Results: </h2>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                < Listing />
                                < Listing />
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
}