// import { configureStore } from "@reduxjs/toolkit";
// // import  reducer  from "../src/features/auth/authSlice";
// import  { authSlice }  from "./features/auth/authSlice";

// //  export const store = configureStore({
// //     reducer: authSlice
// // })

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk  from "redux-thunk";
// import combineReducers from "./store/reducers/index";

// const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//     combineReducers,
//     process.env.node_env === 'production'? 
//     applyMiddleware(thunk) : 
//     composeEnhancers(applyMiddleware(thunk))
// )

// export default  store;

import { createStore, applyMiddleware, compose } from "redux";
import thunk  from "redux-thunk";
import reducer from "./store/reducer";

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    process.env.node_env === 'production'? 
    applyMiddleware(thunk) : 
    composeEnhancers(applyMiddleware(thunk))
)

export default  store;