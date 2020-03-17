import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from 'history'
import {connectRouter, ConnectedRouter, routerMiddleware} from 'connected-react-router';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from "./store/reducer";

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  mainReducer: reducer,
  router: connectRouter(history),
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
