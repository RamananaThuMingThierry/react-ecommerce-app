import React from "react";
import { Link } from "react-router-dom";

const Contact = () =>{
    return (
        <>
            <h1>Contact</h1>
            <Link to="/admin/dashboard" className="btn btn-primary">Admin</Link>
        </>
    );
}

export default Contact;