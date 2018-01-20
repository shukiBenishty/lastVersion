import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import database from 'firebase-database';
import App from './App.jsx';
import reducers from '../jsx/reducers.jsx';
import initReducers from "../jsx/components/employeeEditorReducer.js";
import Routes from '../jsx/routes.jsx';
import { reducer as reduxFormReducer } from 'redux-form';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  initReducers,
  form: reduxFormReducer, // mounted under "form"
  app: reducers
});



const store = createStore(reducer, applyMiddleware(thunk),
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Grab the state from a global variable injected into the server-generated code
const preloadedState = window.__initialState;


if( preloadedState ) {

  store.dispatch({
        type: 'EMPLOYEES_CHANGED',
        data: preloadedState
    });
    // Allow the passed state to be garbage-collected
    delete window.__initialState;
}



render(<Provider store={store}>
                  <BrowserRouter>
                    <Routes state={preloadedState}/>
                  </BrowserRouter>
                </Provider>,
                              document.getElementById('root'));

const getAllEmployees = () => {
  database.getAllEmployees().on('value',(snap) => {
    store.dispatch({
          type: 'EMPLOYEES_CHANGED',
          data: snap.val()
      });
  });
}

getAllEmployees();
