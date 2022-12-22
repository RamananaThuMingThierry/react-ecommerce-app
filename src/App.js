import axios from "axios";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ErrorPage from "./components/ErrorPage";
import Page403 from "./components/errors/Page403";
import Page404 from "./components/errors/Page404";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import Home from "./components/frontend/Home";
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
});

function App (){
    return (
      <div className="App">
          <Switch>
            <Route  exact path="/" name="Home" component={Home}/>

            <Route  path="/403" component={Page403}/>
            <Route  path="/404" component={Page404}/>
            
            <Route  path="/login" name="Login">
              { localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Login/>}
            </Route>
            
            <Route  path="/register" name="Register">
              { localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Register/>}
            </Route>
            
            {/* <Route  path="/admin" name="Admin" render={() => <MasterLayout/>}/> */}
            <AdminPrivateRoute path="/admin" name="Admin"/>
            <Route component={ErrorPage}/>
          </Switch>
      </div>
    );
  }

export default App;
