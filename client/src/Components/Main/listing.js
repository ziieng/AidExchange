import React from 'react'
import { Link } from "react-router-dom";



export default function listing() {
    return (
        <div className="container bg-light w-75" >
            <div>
                <h3>My Listings <Link to="./NewListing" className="btn btn-info ml-2">Add New Listing</Link></h3>
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
