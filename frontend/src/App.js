import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PostPage from "./pages/PostPage/PostPage";
import CreatePost from "./pages/CreatePost/CreatePost";
import UserPage from "./pages/UserPage/UserPage";
import { UserContext } from "./shared/context/UserContext";
import { useAuth } from "./shared/auth-hook";
import Chat from "./pages/ChatPage/components/Chat";
import Buscador from "./pages/BuscarPosts";
import Posts from "./pages/Posts";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={HomePage}></Route>
        {/* <Route path="/agregarpost" exact component={NuevoPost}></Route> */}
        <Route path="/agregarpost" exact component={CreatePost}></Route>
        <Route path="/chat" exact component={Chat}></Route>
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
