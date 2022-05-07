import { applyMiddleware,combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { grabReducer, singleGrabReducer } from "./reducers/grabReducer";
import {
    forgotPasswordReducer,
    profileReducer,
    userReducer,
  } from "./reducers/userReducer";

const reducer = combineReducers({
    grabs: grabReducer,
    singleGrab: singleGrabReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
});

let initialState = {}

const middleware = [thunk];

const store = configureStore({
    reducer,
    preloadedState: initialState
},composeWithDevTools(
    applyMiddleware(...middleware),
  ));

  export default store;