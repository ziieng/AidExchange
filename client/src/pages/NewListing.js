import React from 'react'
import { Link } from 'react-router-dom';

export default function newlisting() {
    return (
        <div>
            <div className="container   mb-5 mt-5 py-3 px-4 bg-light rounded w-50">
                <h1 className="text-center">New Listing</h1>
                <br />
                <form className="" >
                    <form>
                        <label className="font-weight-bold" for="title">Title:</label>
                        <br />
                        <input className="form-control form-control-lg" type="text" id="title" name="title" placeholder="title" />
                        <br />

                        <label className="font-weight-bold" for="catagory">Catagory:</label>
                        <select className="form-select form-select-lg mb-3 form-control" name="type" >
                            <option value="">type</option>
                            <option value="1">Individual</option>
                            <option value="2">501(c)(3) Organizer</option>
                            <option value="3">Non-501 Organizer</option>
                        </select>


                        <br />
                        <div className="row">

                            <div className="col-10">
                                <label className="font-weight-bold" for="catagory">Item:</label>
                                <input className="form-control form-control-lg" type="text" id="item" name="item" placeholder="item" />
                                <br />
                            </div>

                            <div className="col-2">
                                <label className="font-weight-bold" for="catagory">Quantity:</label>

                                <input className="form-control form-control-lg" type="number" placeholder="qty" />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-10">
                                <input className="form-control form-control-lg" type="text" id="item" name="item" placeholder="item" />
                                <br />
                            </div>
                            <div className="col-2">
                                <input className="form-control form-control-lg" type="number" placeholder="qty" />
                            </div>

                        </div>

                        <br />
                        <label className="font-weight-bold" for="location">Location:</label>
                        <br />
                        <input className="form-control form-control-lg" type="text" id="location" name="location" placeholder="location" />
                        <br />
                    </form>

                    <button id="submit" type="submit" to="/" className=" btn btn-success text-center">Submit</button>

                </form>

            </div>
        </div>
    )
}