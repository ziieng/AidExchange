import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/login";
import Signup from "./Components/SignUp/signup";
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
            <Route path="/">
              <p>Success!</p>
            </Route>
          </Switch>
        </>
        )}
    </Router>
  );
}

export default App;
