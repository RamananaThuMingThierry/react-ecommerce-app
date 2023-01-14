import axios from "axios";
import React from "react";
import { Switch } from "react-router-dom";
import AdminPrivateRoute from "./AdminPrivateRoute";
import './assets/admin/plugins/fontawesome-free/css/all.min.css';
import PublicRoute from "./PublicRoute";
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
            {/* <Route  path="/admin" name="Admin" render={() => <MasterLayout/>}/> */}
            <AdminPrivateRoute path="/admin" name="Admin"/>
            <PublicRoute path="/" name="Home"/>
          </Switch>
      </div>
    );
  }

export default App;
