import React from "react";
import "./App.css";

import { Switch, Route, Link } from "react-router-dom";



import Test from 'components/basic/test';

function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/about">
          {/* <About /> */}
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
