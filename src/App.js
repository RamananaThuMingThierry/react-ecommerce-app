import axios from "axios";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import Home from "./components/frontend/Home";
import MasterLayout from "./layouts/admin/MasterLayout";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

function App (){
    return (
      <div className="App">
          <Switch>
            <Route  exact path="/" name="Home" component={Home}/>
            <Route  path="/login" name="Home" component={Login}/>
            <Route  path="/register" name="Home" component={Register}/>
            <Route  path="/admin" name="Admin" render={() => <MasterLayout/>}/>
          </Switch>
      </div>
    );
  }

export default App;
