import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import 'bootstrap'
import Header from './Components/Jumbotron/header'
import Footer from './Components/Footer/footer'
import Login from "./Components/Login/login";
import LogoutButton from "./Components/LogoutButton";
import Signup from "./Components/SignUp/signup";
import Listing from "./Components/Main/listing";
import NewListing from "./Components/NewListing/newlisting";
import fire from "./firebaseConfig";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  return (
    <Router>
      {/* Check if user is signed in */}
      {!isLoggedIn
        ? (<>
          {// If they're not signed in, they can only see login or signup
          }
          <Header />
          <Switch>
            <Route path="/Signup">
              <Signup />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </>
        )
        : (<>
          {// If they are signed in, they can see any page that *isn't* login or signup
          }
          <Switch>
            <Route exact path="/listing">
              <Listing />
            </Route>
            <Route exact path="/newlisting">
              <NewListing />
            </Route>
            <Route path="/">
              <LogoutButton />
            </Route>
          </Switch>
        </>
        )}
      <Footer />
    </Router>
  );
}

export default App;


