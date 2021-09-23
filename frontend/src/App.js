import React, { useState, useMemo, useCallback, useEffect } from "react";
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
import { UserContext } from "./Context/UserContext";
import { useHistory } from "react-router-dom";
import UserPage from "./pages/UserPage/UserPage";
import { useAuth } from "./shared/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  // const login = useCallback((user) => {
  //   setUserId(user.uid);
  //   setToken(user.token);
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, []);

  // const logout = useCallback(() => {
  //   setUserId(null);
  //   setToken(null);
  //   localStorage.clear();
  // }, []);

  // useEffect(() => {
  //   const loggedInUser = JSON.parse(localStorage.getItem("user"));
  //   console.log("LOGGED USER" + JSON.stringify(loggedInUser));

  //   if (loggedInUser) {
  //     console.log("TOKEN " + loggedInUser.token);
  //     console.log("USER ID " + loggedInUser.userId);
  //     login(loggedInUser);
  //   }
  // }, []);

  //const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/user/:userId" exact component={UserPage}></Route>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/login" exact component={AuthPage}></Route>
        {/* <Redirect to="/login" /> */}
      </React.Fragment>
    );
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Switch>{routes}</Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;

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
