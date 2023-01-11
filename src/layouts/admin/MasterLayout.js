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
import EditCategory from "../../components/admin/categories/EditCategory";
import ViewProduct from "../../components/admin/product/ViewProduct";
import EditProduct from "../../components/admin/product/EditProduct";
import AddProduct from "../../components/admin/product/AddProduct";
import Product from "../../components/admin/product/Product";
import AddCategory from "../../components/admin/categories/AddCategory";
import Category from "../../components/admin/categories/Categories";
import Users from "../../components/admin/users/Users";
import EditUsers from "../../components/admin/users/EditUsers";
import ViewUsers from "../../components/admin/users/ViewUsers";
import ViewCategory from "../../components/admin/categories/ViewCategory";

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
                                    {/* Catégories */}
                                    <Route exact path="/admin/category" component={Category} />
                                    <Route exact path="/admin/add-category" component={AddCategory} />
                                    <Route exact path="/admin/view-category/:id" component={ViewCategory} />
                                    <Route exact path="/admin/edit-category/:id" component={EditCategory} />

                                    {/* Produits */}
                                    <Route exact path="/admin/product" component={Product} />
                                    <Route exact path="/admin/add-product" component={AddProduct} />
                                    <Route exact path="/admin/view-product/:id" component={ViewProduct} />
                                    <Route exact path="/admin/edit-product/:id" component={EditProduct} />

                                    {/* Users */}
                                    <Route exact path="/admin/users" component={Users} />
                                    <Route exact path="/admin/view-users/:id" component={ViewUsers} />
                                    <Route exact path="/admin/edit-users/:id" component={EditUsers} />

                                    {/* Page d'erreurs */}
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