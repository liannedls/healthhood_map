import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './components/Map';
import TopNav from './components/Navbar'
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import SubmitLoc from './components/SubmitLoc.jsx';

export default function App() {
    return (
        <Router>
        <div>
          <h2>Welcome to React Router Tutorial</h2>
 <TopNav />
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/Map' component={Map} />
              <Route path='/Submit' component={SubmitLoc} />
          </Switch>
        </div>
      </Router>

            )
}
