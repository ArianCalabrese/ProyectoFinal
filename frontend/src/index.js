<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./index.css";
import Users from "./user/pages/Users";
import Posts from "./posts/pages/Posts";
import Buscador from "./posts/pages/BuscarPosts";
import NavBar from "./pages/HomePage/components/NavBar";
import Footer from "./pages/HomePage/components/sections/Footer";
import Post from "./posts/pages/Post";
import NuevoPost from "./posts/pages/AgregarPost";
import UpdatePost from "./posts/pages/UpdatePost";
import { Update } from "@material-ui/icons";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
//import myStore from "./store";

let routes;
<div id='modal-hook'></div>
routes = (
  
  <Router>
    <NavBar />
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/login" exact>
        <Auth/>
      </Route>
      <Route path="/usuarios" exact>
        <Users />
      </Route>
      <Route path="/agregarpost" exact>
        <NuevoPost />
      </Route>
      <Route path="/posts" exact>
        <Posts />
      </Route>

      <Route path="/posts/buscar" exact>
        <Buscador />
      </Route>
      <Route path="/posts/:postid" exact>
        <UpdatePost />
      </Route>
      <Redirect to="/" />
    </Switch>
  </Router>
 
);

ReactDOM.render(
  <Router>{routes}</Router>,
  
  document.getElementById("root")
);
=======
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
>>>>>>> 295acaff9ffe505cd94eacebc5379efd8a964c66
