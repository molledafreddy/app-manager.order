import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
// import reducer from './store/reducer';
// import reducer from './store/reducers/index';
import { store } from './store';
import config from './config';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { apiSlice } from "./api/apiSlice";


// const store = createStore(reducer);

const persistor = persistStore(store);

const app = (
    // <PersistGate persistStore={persistor}>
        <Provider store={store}>
        {/* <ApiProvider api={apiSlice}> */}
            <BrowserRouter basename={config.basename}>
                {/* basename="/datta-able" */}
                
                <App />
            </BrowserRouter>
        {/* </ApiProvider> */}
        </Provider>
    // </PersistGate>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
