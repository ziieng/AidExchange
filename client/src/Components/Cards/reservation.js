import React from 'react'
import { Card, Button } from 'react-bootstrap';

export default function reservation() {
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
