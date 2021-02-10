import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Login from "./Components/Login/login";
import Signup from "./Components/SignUp/signup";
import NavBar from "./Components/NavBar/navbar";



function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>

          <Route exact path="/Signup"><Signup /></Route>
          <Route exact path="/Login"><Login /></Route>
        </Switch>


      </div>

    </Router>
  );
}


export default App;
