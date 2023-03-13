import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


// import { configureStore } from '@reduxjs/toolkit'
// import tutorialReducer from './slices/tutorials';

// const reducer = {
//   tutorials: tutorialReducer
// }

// const store = configureStore({
//   reducer: reducer,
//   devTools: true,
// })

// export default store;