import { _ } from 'underscore';
import database from 'firebase-database';


const update = (state, mutations) =>
_.assign({}, state, mutations);

 const INITIAL_STATE = {
     employees: []
  };

const reducers = (state = INITIAL_STATE, action ) => {

    switch( action.type ) {

    case 'EMPLOYEES_CHANGED' :
        state = update(state, {employees: action.data} );
        break;
    case 'ADD_EMPLOYEE' :
        database.addEmployee(action.data);
        break;
    default:
        return state;
    }
    return state;

};


export default reducers;
