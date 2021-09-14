import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./index.scss";
//import myStore from "./store";

let routes;

routes = (
  <Switch>
    <Route path="/" exact>
      <HomePage />
    </Route>
    <Route path="/login" exact>
      <AuthPage />
    </Route>
  </Switch>
);

ReactDOM.render(
  <Router>{routes}</Router>,

  document.getElementById("root")
);
