import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";

const Home = () =>{
    return (
        <>
            <Navbar/>
            <div className="container">
                <h1>Home</h1>
                <Link to="/admin/dashboard" className="btn btn-primary">Admin</Link>
            </div>
        </>
    );
}

export default Home;