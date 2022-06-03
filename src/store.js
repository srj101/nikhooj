import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  grabReducer,
  likeGrabReducer,
  singleGrabReducer,
  postGrabReducer,
} from "./reducers/grabReducer";
import {
  forgotPasswordReducer,
  profileReducer,
  userPostsReducer,
  userReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  grabs: grabReducer,
  singleGrab: singleGrabReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  hearts: likeGrabReducer,
  postedGrab: postGrabReducer,
  userPosts: userPostsReducer,
});

const persistConfig = {
  key: "nikhooj",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

let initialState = {};

const middleware = [thunk];

const store = configureStore(
  {
    reducer: persistedReducer,
    preloadedState: initialState,
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
