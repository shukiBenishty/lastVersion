import React from 'react';
import { connect } from 'react-redux';
import  { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom'
import Employees from '../jsx/components/DataGrid.jsx';
import database from 'firebase-database';

class App extends React.Component {

  constructor(props){
    super(props);


    // if (props.employees) {
    //   this.state = {
    //     employees: props.employees
    //   }
    // } else if (true) {
    //   this.state = {
    //     employees: []
    //   }
    //
    // }
  }

  render() {
    return(
        <Switch>
          <Route path="/">
            <Employees />
          </Route>
        </Switch>
    );
  };
};

const mapStateToProps = state =>
{
    return state.app

};


export default withRouter(connect(mapStateToProps)(App));
