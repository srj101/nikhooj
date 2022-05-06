import { applyMiddleware,combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { grabReducer, singleGrabReducer } from "./reducers/grabReducer";

const reducer = combineReducers({
    grabs: grabReducer,
    singleGrab: singleGrabReducer
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