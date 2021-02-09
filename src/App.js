import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map";
import TopNav from "./components/Navbar";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SubmitLoc from "./components/SubmitLoc.jsx";
import Online from "./components/OnlineResources.js";

export default function App() {
  return (
    <Router>
      <div>
        <h2>Welcome to React Router Tutorial</h2>
        <TopNav />
        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Map" component={Map} />
          <Route path="/Online" component={Online} />
          <Route path="/Submit" component={SubmitLoc} />
        </Switch>
      </div>
    </Router>
  );
}
