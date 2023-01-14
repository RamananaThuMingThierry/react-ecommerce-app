import React from "react";
import { Link } from "react-router-dom";

const Home = () =>{
    return (
        <>
          <h1>Home</h1>
          <Link to="/admin/dashboard" className="btn btn-primary">Admin</Link>
        </>
    );
}

export default Home;