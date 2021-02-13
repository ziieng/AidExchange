import React from 'react'

export default function listing() {
    return (
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

    )
}
