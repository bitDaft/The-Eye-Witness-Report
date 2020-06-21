import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "components/app/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import newsApp from "store/reducer";

const store = createStore(newsApp, {}, applyMiddleware(thunkMiddleware));


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
