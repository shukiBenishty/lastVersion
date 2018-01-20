import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import asyncValidate from './asyncValidate';
import validate from './validate';
import { load as loadDeta } from '../../employeeEditorReducer.js';


const Arr = [
{
    "name":"id",
    "label":"תעודת זהות",
    "type":"TextField"
      },
{
    "name":"lastName",
    "label":"שם משפחה",
    "type":"TextField"
      },
      {
        "name":"firstName",
        "label":"שם פרטי",
        "type":"TextField"
      },
{
    "name":"sex",
    "label":"מין",
    "type":"RadioGroup",
    "radioButtons":[
      {
        "value": "male",
        "label": "זכר"
      },
      {
        "value": "female",
        "label": "נקבה"
      }
    ]
      },
{
    "name":"addressCity",
    "label":"עיר",
    "type":"TextField"
      },
{
    "name":"addressStreet",
    "label":"רחוב",
    "type":"TextField"
      },
{
    "name":"phone",
    "label":"פלאפון",
    "type":"TextField"
      },
{
    "name":"telephone",
    "label":"טלפון",
    "type":"TextField"
	    },
{
    "name":"email",
    "label":"אימייל",
    "type":"TextField"
      },
{
    "name":"employed",
    "label":"משובץ",
    "type":"Checkbox"
      },
{
    "name":"notes",
    "label":"הערות",
    "type":"TextField",
    "multiLine": true
      }
];

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
);

const renderRadioGroup = ({ input, ...rest }) => (
  <div>
    <br/>
    <RadioButtonGroup
      {...input}
      {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  </div>
);

const renderSelectField = (
  { input, label, meta: { touched, error }, children, ...custom },
) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);

const createFields = (arr) => {
  return arr.map((val) => {
    if (val.type === "TextField"){
      return (<div>
                <Field
                  name={val.name}
                  component={renderTextField}
                  label={val.label}
                  multiLine={(val.multiLine)? true: false}
                />
              </div>)
    }
    if (val.type === "RadioGroup"){
      return (<div>
                <Field
                  name={val.name}
                  label={val.label}
                  component={renderRadioGroup} >
                  {val.radioButtons.map((radioVal) =>{
                    return <RadioButton value={radioVal.value} label={radioVal.label} />
                  })}
                </Field>
              </div>)
    }
    if (val.type === "Checkbox"){
      return (<div>
                <Field
                   name={val.name}
                   component={renderCheckbox}
                   label={val.label}
                />
              </div>)
    }
  });
}

class MaterialUiForm extends React.Component {

  constructor(props){
    super(props);
    const { handleSubmit, pristine, reset, submitting, load, initdata } = props;

  }


  // componentDidMount(){
  //   this.load(this.initdata)
  //
  // }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {createFields(Arr)}
        <div>
          <button type="submit" disabled={this.pristine || this.submitting}>Submit</button>
          <button type="button" disabled={this.pristine || this.submitting} onClick={this.reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  };
};



// const MaterialUiForm = props => {
//   const { handleSubmit, pristine, reset, submitting, load } = props;
//   return (
//     <form onSubmit={handleSubmit}>
//       {createFields(Arr)}
//       <div>
//         <button type="submit" disabled={pristine || submitting}>Submit</button>
//         <button type="button" disabled={pristine || submitting} onClick={reset}>
//           Clear Values
//         </button>
//       </div>
//     </form>
//   );
// };

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
MaterialUiForm = reduxForm({
  form: 'MaterialUiForm' // a unique identifier for this form
})(MaterialUiForm)


// You have to connect() to any reducers that you wish to connect to yourself
MaterialUiForm = connect(
  state => ({
    initialValues: state.init.data // pull initial values from account reducer
  }),
  { load: loadDeta }, // bind account loading action creator
)(MaterialUiForm);



export default MaterialUiForm
