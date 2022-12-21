import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Menu extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" to="#">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-targer="#opennavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="opennavbar">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a href="/" className="nav-link active">Docs</a>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/community" className="nav-link">Community</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tutoriels" className="nav-link">Tutoriels</NavLink>
                            </li>
                        </ul>
                    </div>
                </div> 
            </nav>
        );
    }
}

export default Menu;