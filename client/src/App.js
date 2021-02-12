import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from './Components/Jumbotron/header'
import Footer from './Components/Footer/footer'
import Login from "./Components/Login/login";
import Signup from "./Components/SignUp/signup";
import Listing from "./Components/Main/listing";
import NewListing from "./Components/NewListing/newlisting";




function App() {
  return (
    <Router>
      <div>
        < Header />
        <Switch>
          <Route exact path="/Signup"><Signup /></Route>
          <Route exact path="/Login"><Login /></Route>
          <Route exact path="/listing"><Listing /></Route>
          <Route exact path="/newlisting"><NewListing /></Route>
        </Switch>
        < Footer />
      </div>

    </Router>
  );
}

export default App;


