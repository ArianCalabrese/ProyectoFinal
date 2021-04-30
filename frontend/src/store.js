import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const posts = Cookie.getJSON("posts") || [];
const search = Cookie.getJSON("search") || [];
const userInfo = Cookie.getJSON("userInfo") || "";

const initialState = {
  userSignin: { userInfo },
  postsSearch: { posts },
  saveSearch: search,
};

const reducer = combineReducers({});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default myStore;
