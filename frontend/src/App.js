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
import HomePage from "./pages/HomePage/HomePage";
import Buscador from "./posts/pages/BuscarPosts";
import AuthPage from "./pages/AuthPage/AuthPage";
import PostPage from "./pages/PostPage/PostPage";
import CreatePost from "./pages/CreatePost/CreatePost";
import UserPage from "./pages/UserPage/UserPage";
import { UserContext } from "./Context/UserContext";
import { useAuth } from "./shared/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  // const login = useCallback((uid, token) => {
  //   setToken(token);
  //   setUserId(uid);
  // }, []);

  // const logout = useCallback(() => {
  //   setToken(null);
  //   setUserId(null);
  // }, []);

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={HomePage}></Route>
        {/* <Route path="/agregarpost" exact component={NuevoPost}></Route> */}
        <Route path="/agregarpost" exact component={CreatePost}></Route>

        <Route path="/posts" exact component={Posts}></Route>
        <Route path="/posts/:postid" exact component={PostPage}></Route>
        {/* <Route path="/:userId/posts" exact component={UserPosts}></Route> */}
        <Route path="/user/:userId" exact component={UserPage}></Route>

        <Route path="/buscarpost" exact component={Buscador}></Route>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/login" exact component={AuthPage}></Route>
        {/* <Route path="/:userId/posts" exact component={UserPosts}></Route> */}
        <Route path="/user/:userId" exact component={UserPage}></Route>

        <Route path="/buscarpost" exact component={Buscador}></Route>
        <Route path="/posts" exact component={Posts}></Route>
        <Route path="/posts/:postid" exact component={PostPage}></Route>

        {/* <Redirect to="/login" /> */}
      </React.Fragment>
    );
  }
  // if (token) {
  //   routes = (
  //     <Switch>
  //       <Route path="/" exact>
  //         <Home />
  //       </Route>
  //       <Route path="/usuarios" exact>
  //         <Users />
  //       </Route>
  //       <Route path="/buscarpost" exact>
  //         <Buscador />
  //       </Route>
  //       <Route path="/agregarpost" exact>
  //         <NuevoPost />
  //       </Route>
  //       <Route path="/posts" exact>
  //         <Posts />
  //       </Route>
  //       <Route path="/:userId/posts" exact>
  //         <UserPosts />
  //       </Route>
  //       <Route path="/posts/:postid" exact>
  //         <UpdatePost />
  //       </Route>
  //       <Redirect to="/" exact />
  //     </Switch>
  //   );
  // } else {
  //   routes = (
  //     <Switch>
  //       <Route path="/" exact>
  //         <Home />
  //       </Route>
  //       <Route path="/usuarios" exact>
  //         <Users />
  //       </Route>
  //       <Route path="/login" exact component={AuthPage}></Route>
  //       <Route path="/posts" exact>
  //         <Posts />
  //       </Route>
  //       <Route path="/:userId/posts" exact>
  //         <UserPosts />
  //       </Route>
  //       <Route path="/posts/:postid" exact>
  //         <UpdatePost />
  //       </Route>
  //       <Redirect to="/" exact />
  //     </Switch>
  //   );
  // }

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
