import React, { Component } from "react";
import Aside from "./Aside";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../../assets/admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "../../assets/admin/dist/css/adminlte.min.css";
import {Route, Switch } from "react-router-dom";
import Dashboard from "../../components/admin/Dashboard";
import Profile from "../../components/admin/Profile";
import ErrorPage from "../../components/ErrorPage";
import Category from "../../components/admin/categories/Category";
import ViewCategory from "../../components/admin/categories/ViewCategories";
import EditCategory from "../../components/admin/categories/EditCategory";
import ViewProduct from "../../components/admin/product/ViewProduct";
import EditProduct from "../../components/admin/product/EditProduct";
import AddProduct from "../../components/admin/product/AddProduct";
import Product from "../../components/admin/product/Product";

class MasterLayout extends Component{
    render(){
        return(
            <div className="hold-transition sidebar-mini layout-fixed">
                <div className="wrapper">
                    <Navbar/>
                    <Aside/>
                    <div className="content-wrapper">
                        <section class="content">
                            <div class="container-fluid">
                                <Switch>
                                    <Route exact path="/admin/dashboard" component={Dashboard} />
                                    <Route exact path="/admin/profile" component={Profile} />
                                    <Route exact path="/admin/add-category" component={Category} />
                                    <Route exact path="/admin/view-category" component={ViewCategory} />
                                    <Route exact path="/admin/edit-category/:id" component={EditCategory} />
                                    <Route exact path="/admin/product" component={Product} />
                                    <Route exact path="/admin/add-product" component={AddProduct} />
                                    <Route exact path="/admin/view-product/:id" component={ViewProduct} />
                                    <Route exact path="/admin/edit-product/:id" component={EditProduct} />
                                    <Route component={ErrorPage}/>
                                </Switch>
                            </div>
                        </section>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default MasterLayout;