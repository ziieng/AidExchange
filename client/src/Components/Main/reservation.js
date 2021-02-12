import React, { Link } from 'react'

export default function reservation() {
    return (
        <div className="container bg-info" >
            <div>
                <h3>My Reservations <Link to="" className="btn btn-info ml-2">Search For Items</Link></h3>
            </div>
            <div className="row"  >

                <div className="col-3">
                    <button className="bg-info">Edit</button>
                </div>
                <div className="col-6">
                    <ul className="list-group">
                        <li className="list-group-item"></li>
                    </ul>
                </div>
                <div className="col-3">
                    <button>open</button>
                </div>
            </div>
        </div>
    )
}
