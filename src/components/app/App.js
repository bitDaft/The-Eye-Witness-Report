import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Test from 'components/basic/test';

import Home from 'components/views/Home'


function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/users">
          {/* <Users /> */}
        </Route>
        <Route path="/">
          {/* <Home /> */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
