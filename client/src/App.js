import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap";
import fire from "./firebase";
import Header from "./Components/Jumbotron/header";
import Footer from "./Components/Footer/footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ListingDetail from "./pages/ListingDetail";
import NewListing from "./pages/NewListing";
import Dashboard from "./pages/Dashboard";
import ProfileDetail from "./pages/ProfileDetail";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import Search from "./pages/Search";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  return (
    <Router>
      {!isLoggedIn ? (
        <>
          {
            // If they're not signed in, they can only see login or signup
          }
          <Header />
          <Switch>
            <Route path="/Signup">
              <Signup />
            </Route>
            <Route path="/ForgotPassword">
              <ForgotPassword />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </>
      ) : (
          <>
            {
              // If they are signed in, they can see any page that *isn't* login or signup
            }
            <Switch>
              <Route exact path="/newlisting">
                <NewListing />
              </Route>
              <Route path="/listing/:id">
                <ListingDetail />
              </Route>
              <Route path="/editlisting/:id">
                <EditListing />
              </Route>
              <Route path="/profile/:id">
                <ProfileDetail />
              </Route>
              <Route path="/editprofile">
                <EditProfile />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </>
        )}
      <Footer />
    </Router>
  );
}

export default App;
