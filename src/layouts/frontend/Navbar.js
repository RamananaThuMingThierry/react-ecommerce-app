import React from "react";
import { Link } from "react-router-dom";

const Navbar = () =>{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="#">E-commerce</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-targer="#opennavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="opennavbar">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">Collection</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </ul>
                </div>
            </div> 
        </nav>
    );
}
export default Navbar;