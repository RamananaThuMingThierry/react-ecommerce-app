import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

const Login = () =>{

    const history = useHistory();

    const [LoginInput, setLogin] = useState({
        email: '',
        mdp:'',
        error_list: [],
    });

    const handleInput = (e) =>{
        e.persist();
        setLogin({...LoginInput, [e.target.name]: e.target.value});
    }

    const LoginSubmit = (e) =>{
        e.preventDefault();

        const data = {
            email: LoginInput.email,
            mdp: LoginInput.mdp
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res =>{
                if(res.data.status  === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message,"success");
                    if(res.data.role === "admin"){
                        history.push("/admin/dashboard");
                    }else{
                        history.push("/");
                    }
                }else if(res.data.status === 401){
                    swal("Warning", res.data.message,"warning");
                }
                else{
                    setLogin({...LoginInput, error_list: res.data.Validation_errors});
                }
            });
        });
    }

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
                                <form onSubmit={LoginSubmit}>
                                    <div className="form-group">
                                        <input type="email" placeholder="E-mail" name="email" onChange={handleInput} className="form-control" value={LoginInput.email}/>
                                        <span>{LoginInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Mot de passe" name="mdp" onChange={handleInput} className="form-control" value={LoginInput.mdp}/>
                                        <span>{LoginInput.error_list.mdp}</span>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Connexion</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;