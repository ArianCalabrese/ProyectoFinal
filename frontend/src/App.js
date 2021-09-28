import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

import Users from "./user/pages/Users";
import Posts from "./posts/pages/Posts";
import NuevoPost from "./posts/pages/AgregarPost";
import UpdatePost from "./posts/pages/UpdatePost";
import Auth from "./user/pages/Auth";
import UserPosts from "./posts/pages/UserPosts";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import Home from "./Home/pages/Home";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
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
        <Route path="/:userId/posts" exact>
          <UserPosts />
        </Route>
        <Route path="/posts/:postid" exact>
          <UpdatePost />
        </Route>
        <Redirect to="/" exact />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/usuarios" exact>
          <Users />
        </Route>
        <Route path="/login" exact>
          <Auth />
        </Route>
        <Route path="/posts" exact>
          <Posts />
        </Route>
        <Route path="/:userId/posts" exact>
          <UserPosts />
        </Route>
        <Route path="/posts/:postid" exact>
          <UpdatePost />
        </Route>
        <Redirect to="/" exact />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
