import React from "react";
import { Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/frontend/Home";
import MasterLayout from "./layouts/admin/MasterLayout";
// import ErrorPage from "./components/ErrorPage";

function App (){
    return (
      <div className="App">
          {/* <BrowserRouter>
            <Menu/>
            <Switch>
              <Route exact path="/" component={Docs}/>
              <Route path="/tutoriels" component={Tutoriels}/>
              <Route strict path="/community" component={Community}/>
              <Route component={ErrorPage}/>
            </Switch>
          </BrowserRouter> */}
          <Switch>
            <Route exact path="/" name="Home" component={Home}/>
            <Route path="/admin" name="Admin" render={() => <MasterLayout/>}/>
          </Switch>
          {/* <MasterLayout/> */}
      </div>
    );
  }

export default App;
