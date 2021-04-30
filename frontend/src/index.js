import React from "react";
import ReactDOM from "react-dom";

import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage/HomePage";
//import myStore from "./store";

ReactDOM.render(
  <HomePage />,

  document.getElementById("root")
);
