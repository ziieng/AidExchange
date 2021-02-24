import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap";
import "./App.css";
import fire from "./firebase";
import Header from "./Components/Jumbotron/header";
import Footer from "./Components/Footer/footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ListingDetail from "./pages/ListingDetail";
import ListingForm from "./pages/ListingForm";
import ProfileDetail from "./pages/ProfileDetail";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                  <ListingForm version="New" />
                </Route>
                <Route path="/editlisting/:id">
                  <ListingForm version="Edit" />
                </Route>
                <Route path="/listing/:id">
                  <ListingDetail />
                </Route>
                <Route path="/profile/:id">
                  <ProfileDetail />
                </Route>
                <Route path="/editprofile">
                  <EditProfile />
                </Route>
                <Route path="/search">
                  <Search />
                  <Route path="/">
                    <Dashboard />
                  </Route>
                </Route>
              </Switch>
            </>
          )}
        <Footer />
      </Router>
    </div>
  )
}

export default App;
