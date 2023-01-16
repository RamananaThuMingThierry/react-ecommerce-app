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
                    <Link to="/login" className="nav-link">Connexion</Link>    
                    <Link to="/register" className="nav-link">S'inscrire</Link>
            </Fragment>
        );
    }else{
        AuthButtons = (
                <Link to="/logout" onClick={LogoutSubmit} className="nav-link btn-sm btn-danger text-white">Déconnexion</Link>
        );
    }

    return(
        <header>
            <Link to="/" class="logo"><i class="fas fa-utensils"></i>E-commerce</Link>
            
            <nav class="navbar">
                <Link to="/" class="active">Accueil</Link>
                <Link to="/collection">Collection</Link>
                <Link to="/about">Apropos</Link>
                <Link to="/contact">Contact</Link>
                {AuthButtons}
            </nav>
            
            <div class="icons">
                <i class="fas fa-bars" id="menu-bars"></i>
                <i class="fas fa-search" id="search-icon"></i>
                <a href="#" class="fas fa-heart"></a>
                <Link to="/cart" class="fas fa-shopping-cart"></Link>
            </div>
            
        </header>
    );
}
export default Navbar;

