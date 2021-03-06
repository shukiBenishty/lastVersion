import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux';
// Import React Table
import ReactTable from "react-table";
import Employee from "./forms/Employees/employees.jsx";
import EmployeeEditor from './employeeEditor.js';
import MaterialUiForm from './forms/Employees/MaterialUiForm.js';
import {addEmployee}from 'firebase-database';
import 'react-table/react-table.css'

if (typeof window === 'undefined') {
    global.window = {"navigator":{}}

}

class EmployeesTable extends React.Component {
  constructor(props) {
    super(props);
    if (props.employees) {
      var arr = [];
      for(var employee in props.employees) {
            arr.push(props.employees[employee]);
      };
      this.state = {
        data: arr
      };
    } else {
      this.state = {
        data: []
      }
    }


  }




  componentWillReceiveProps (newProps) {
    if( newProps.employees !== this.props.employees ) {
      var arr = [];
      for(var employee in newProps.employees) {
            arr.push(newProps.employees[employee]);
      }
      this.setState({
        data: arr
      });
    };
  }



  render() {
    const { data } = this.state;
    return (
      <div>
      <Employee />
        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
          columns={[
            {
             columns: [
               {
                 Header: "ערוך",
                 width: 65,
                 filterable: false,
                 Cell: ({index, ...rest }) =>
                   <div>
                       <EmployeeEditor displayButton={<span >&#9998;</span>}
                            comp={<MaterialUiForm
                                      initdata={data[index]}
                                      onSubmit={addEmployee}
                                      />}
                        />
                   </div>,

               }
             ]
           },
            {
              Header: "תעודת זהות",
              accessor: "id"
            },
            {
              Header: "שם",
              columns: [
                {
                  Header: "שם פרטי",
                  accessor: "firstName"
                },
                {
                  Header: "משפחה",
                  id: "lastName",
                  accessor: d => d.lastName
                }
              ]
            },
            {
              Header: "כתובת",
              columns: [
                {
                  Header: "עיר",
                  accessor: "addressCity"
                },
                {
                  Header: "רחוב",
                  accessor: "addressStreet"
                }
              ]
            },
            {
              Header: "פרטי התקשרות",
              columns: [
                {
                  Header: "פלאפון",
                  accessor: "phone"
                },
                {
                  Header: "טלפון",
                  accessor: "telephone"
                },
                {
                  Header: "מייל",
                  accessor: "email"
                }
              ]
            },
            {
              Header: "השכלה",
              accessor: "degree"
            },
            {
              Header: "תאריך לידה",
              accessor: "birthday"
            },
            {
              Header: "קבלה לעבודה",
              accessor: "receivedDate"
            }
          ]}
          defaultPageSize={15}
          className="-striped -highlight"

        />
      </div>
    );
  }
}

const mapStateToProps = state =>
{
    return {
        employees: state.app.employees
    }
};

export default connect(mapStateToProps)(EmployeesTable);
//
// SubComponent={(row) => <div >
//                        <EmployeeEditor comp={<MaterialUiForm initdata={data[row.index]} onSubmit={addEmployee} />}/>
//                      </div>}
