import React from 'react';
import NavBar from '../NavBar/navbar'
import { Card, Button } from 'react-bootstrap';
export default function listing() {
    return (
        <Card>
            <div className="row"  >
                <div className="col-3">
                    <Button className="">Edit</Button>
                </div>
                <div className="col-6">
                    <ul className="list-group">
                        <li className="list-group-item"></li>
                    </ul>
                </div>
                <div className="col-3">
                    <Button>open</Button>
                </div>
            </div>

        </Card>

    )
}
