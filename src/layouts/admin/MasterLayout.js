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
                                    <Route path="/admin/dashboard" component={Dashboard} />
                                    <Route path="/admin/profile" component={Profile} />
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