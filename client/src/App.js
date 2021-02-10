import React, { Component } from "react";
import "./App.css";
import Header from '../src/Components/Jumbotron/header'
import Footer from '../src/Components/Footer/footer'


class App extends Component {
  render() {
    return (
      <div>
        < Header />

        < Footer />
      </div>
    );
  }
}

export default App;
