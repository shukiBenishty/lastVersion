import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialUiForm from './MaterialUiForm';
import {addEmployee}from 'firebase-database';


if (typeof window === 'undefined') {
    global.window = {"navigator":{}}

}

class EmployeeForm extends React.Component {

    constructor(props){
      super(props);
    }



  render() {
    return (
      <div>
      <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">הוספת עובד</button>
        <div className={ `modal fade In` } id='myModal' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className="modal-header">
               <button type="button" className="close" data-dismiss="modal">&times;</button>
                 <div className='modal-body'>
                  <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div style={{ padding: 15 }}>
                      <MaterialUiForm onSubmit={addEmployee} />
                    </div>
                  </MuiThemeProvider>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
    );
  }
}



export default EmployeeForm;
