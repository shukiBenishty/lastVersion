import React  from 'react';
import ReactDomServer  from 'react-dom/server';
import { StaticRouter } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import database from 'firebase-database';
import reducers from '../jsx/reducers.jsx';
import Routes  from '../jsx/routes.jsx';

import { reducer as reduxFormReducer } from 'redux-form';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  app: reducers
});


const store = createStore(reducer, applyMiddleware(thunk))


export default class ServerApp extends React.Component {
  constructor(props) {
    super(props);
    database.initializeApp(props.appConfig);


    store.dispatch({
          type: 'EMPLOYEES_CHANGED',
          data: this.props.initialState
      });

  }


  render() {

    return (
      <Provider store={store}>
          <StaticRouter location={this.props.url} context={this.props.context}>
            <Routes />
          </StaticRouter>
      </Provider>);
  }
}
