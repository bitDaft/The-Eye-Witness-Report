import React from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";

import Home from "components/views/Home";
import ArticleDetail from "components/views/ArticleDetails";
import NotFound from "components/views/NotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/details/:id" component={ArticleDetail} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
