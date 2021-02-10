import React from "react";

function Header(props) {
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">AidExchange</h1>
                {/* <p className="lead"></p> */}
            <hr className='my-4 underline'></hr>
            </div>
        </div>
    );
}

export default Header;