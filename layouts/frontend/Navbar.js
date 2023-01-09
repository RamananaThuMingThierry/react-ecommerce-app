import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import swal from "sweetalert";

const Navbar = () =>{

    const history = useHistory();
    
    const LogoutSubmit = (e) =>{
        e.preventDefault();

        axios.post(`api/logout`).then(res =>{
            if(res.data.status === 200){
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                swal("Success", res.data.message, "success");
                history.push('/');
            }
        });
    }

    var AuthButtons = '';
    
    if(!localStorage.getItem('auth_token')){
        AuthButtons = (
            <Fragment>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Connexion</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">S'inscrire</Link>
                </li>
            </Fragment>
        );
    }else{
        AuthButtons = (
            <li className="nav-item">
                <button to="/logout" onClick={LogoutSubmit} className="nav-link btn-sm btn-danger text-white">Déconnexion</button>
            </li>
        );
    }

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
                        {AuthButtons}
                    </ul>
                </div>
            </div> 
        </nav>
    );
}
export default Navbar;