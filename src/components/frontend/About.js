import React from "react";
import { Link } from "react-router-dom";

const About = () =>{
    return (
        <>
            <h1>About</h1>
            <Link to="/admin/dashboard" className="btn btn-primary">Admin</Link>
        </>
    );
}

export default About;