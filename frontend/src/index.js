import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Provider } from "react-redux";
// import HomePage from "./pages/HomePage/HomePage";
// import AuthPage from "./pages/AuthPage/AuthPage";
// import "./index.css";
// //import myStore from "./store";
// import { UserContext } from "./Context/UserContext";
// let routes;

// routes = (
//   <Switch>
//     <UserContext.Provider value="Hello from context">
//       <Route path="/" exact>
//         <HomePage />
//       </Route>
//       <Route path="/login" exact>
//         <AuthPage />
//       </Route>
//     </UserContext.Provider>
//   </Switch>
// );

// ReactDOM.render(
//   <Router>{routes}</Router>,

//   document.getElementById("root")
// );
