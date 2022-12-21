import React from "react";
import Navbar from "../../../layouts/frontend/Navbar";

const Login = () =>{
    return (
        <>
            <Navbar/>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card rounded-0">
                            <div className="card-header">
                                <h4 className="text-center">Login</h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <input type="email" placeholder="E-mail" name="email" className="form-control" value=""/>
                                </div>
                                <div className="form-group">
                                    <input type="password" placeholder="Mot de passe" name="mdp" className="form-control" value=""/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Connexion</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;