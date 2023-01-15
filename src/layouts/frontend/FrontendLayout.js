import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import About from "../../components/frontend/About";
import Contact from "../../components/frontend/Contact";
import Home from "../../components/frontend/Home";
import Navbar from "../../layouts/frontend/Navbar";
import Page403 from "../../components/errors/Page403";
import Page404 from "../../components/errors/Page404";
import Login from "../../components/frontend/auth/Login";
import Register from "../../components/frontend/auth/Register";
import CollectionVeiwCategory from "../../components/frontend/collection/CollectionViewCategory";
import CollectionViewProduct from "../../components/frontend/collection/CollectionViewProduct.js";
import CollectionProductDetails from "../../components/frontend/collection/CollectionProductDetails";
import Cart from "../../components/frontend/Cart";
class FrontendLayout extends Component{
    render(){
        return (
            <>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route  exact path="/" name="Home" component={Home}/>
                        <Route  exact path="/about" name="About" component={About}/>
                        <Route  exact path="/contact" name="Contact" component={Contact}/>
                        <Route  exact path="/collection" name="collection" component={CollectionVeiwCategory}/>
                        <Route  exact path="/cart" name="cart" component={Cart}/>
                        <Route  exact path="/collections/:slug" name="collection Product" component={CollectionViewProduct}/>
                        <Route  exact path="/collections/:category/:product" name="collection Product Details" component={CollectionProductDetails}/>
                        <Route  path="/403" component={Page403}/>
                        <Route  path="/404" component={Page404}/>
                        <Route  path="/login" name="Login">
                        { localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Login/>}
                        </Route>
                        <Route  path="/register" name="Register">
                        { localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Register/>}
                        </Route>
                    </Switch>
                </div>
            </>
        );
    }
}

export default FrontendLayout;