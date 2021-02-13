import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from './Components/Jumbotron/header'
// import Footer from './Components/Footer/footer'
import Login from "./Components/Login/login";
// import Signup from "./Components/SignUp/signup";



function App() {
  return (
    < Router >
      <div>
        < Header />
        < Login />
      </div>
    </Router>
  );
}

export default App;
