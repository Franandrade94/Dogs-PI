import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from './Components/1-LandingPage/LandingPage';
import Logo from './Components/2-Logo/Logo';
import Logo2 from "./Components/2-Logo/Logo2"
import Nav from './Components/3-Nav/Nav';
import Home from './Components/5-Home/Home';
import DogDetails from './Components/7-DogDetails/DogDetails';
import CreateDog2 from './Components/8-CreateDog/CreateDog2';
import Sort from './Components/10-Sort/Sort';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={LandingPage} />

        <Route path="/home" exact component={Logo} />
        <Route path="/home" exact component={Nav} />
        <Route path="/home" exact component={Sort} />
        <Route path="/home" exact component={Home} />

        <Route path="/dogs/:id" exact component={Logo2} />
        <Route path="/dogs/:id" exact component={DogDetails} />

        <Route path="/dog/create" exact component={Logo} />
        <Route path="/dog/create" exact component={CreateDog2} />
        
      </Router>
    </div>
  );
}

export default App;
