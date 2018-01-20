import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import {AutoComplete as MUIAutoComplete} from 'material-ui';
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle,
} from 'redux-form-material-ui';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);
const tooManyPizzas = value => (value > 15 ? 'Are you mad?' : undefined);


const createFields = (arr) => {
  return arr.map((val) => {
    if (val.type === "TextField"){
      return (<div>
          <Field
            name={val.name}
            component={TextField}
            hintText={val.label}
            floatingLabelText={val.label}
            validate={val.validate}
            ref={val.name}
            multiLine={(val.multiLine)? true: false}
            withRef
          />
        </div>)
    }
    if (val.type === "RadioGroup"){
      return (<div>
                <Field
                  name={val.name}
                  component={RadioButtonGroup} >
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
                   component={Checkbox}
                   label={val.label}
                />
              </div>)
    }
    if (val.type === "DatePicker"){
      return (<div>
                <Field
                  name={val.name}
                  component={DatePicker}
                  format={null}
                  hintText={val.label}
                  validate={val.validate}
                />
              </div>)
    }
    if (val.type === "SelectField"){
      return (<div>
                <Field
                  name={val.name}
                  component={SelectField}
                  hintText={val.label}
                  floatingLabelText={val.label}
                  validate={val.validate}
                >
                {val.menuItem.map((Item) =>{
                  return <RadioButton value={Item.value} primaryText={Item.label} />
                })}
                </Field>
              </div>)
    }
    if (val.type === "AutoComplete"){
      return (<div>
        <Field
          name={val.name}
          component={AutoComplete}
          floatingLabelText={val.label}
          openOnFocus
          filter={MUIAutoComplete.fuzzyFilter}
          dataSourceConfig={val.dataSourceConfig}
          dataSource={val.dataSource}
        />
      </div>)
    }



  });
}










class Form extends Component {
  // componentDidMount() {
  //   this.refs.name // the Field
  //     .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
  //     .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
  //     .focus(); // on TextField
  // }



  render() {
    const {handleSubmit, pristine, numPizzas, reset, submitting, arr} = this.props;
    return (
      <form onSubmit={handleSubmit}>

        {createFields(arr)}

        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear
          </button>
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('example');

Form = connect(state => ({
  numPizzas: selector(state, 'pizzas'),
}))(Form);

// Form = reduxForm({
//   form: 'example',
//   initialValues: {
//     delivery: 'delivery',
//     name: 'Jane Doe',
//     cheese: 'Cheddar',
//     pizzas: 1,
//   },
// })(Form);

Form = reduxForm({
  form: 'example'
})(Form);

export default Form;








// <div>How many pizzas do you want?</div>
// <div>{numPizzas}</div>
// <div>
//   <Field
//     name="pizzas"
//     component={Slider}
//     defaultValue={0}
//     format={null}
//     min={0}
//     max={20}
//     step={1}
//     warn={tooManyPizzas}
//   />
// </div>
//
// <div>
//   <Field
//     name="thinCrust"
//     component={Toggle}
//     label="Thin Crust"
//     labelPosition="right"
//   />
// </div>
// <div>
//   <Field
//     name="at"
//     component={TimePicker}
//     format={null}
//     defaultValue={null} // TimePicker requires an object,
//     // and redux-form defaults to ''
//     hintText="At what time?"
//     validate={required}
//   />
// </div>


// <div>
//   <Field
//     name="referral"
//     component={AutoComplete}
//     floatingLabelText="How did you find us?"
//     openOnFocus
//     filter={MUIAutoComplete.fuzzyFilter}
//     dataSourceConfig={{text: 'name', value: 'id'}}
//     dataSource={[
//       {id: 0, name: 'Facebook'},
//       {id: 1, name: 'Yelp'},
//       {id: 2, name: 'TV Ad'},
//       {id: 3, name: 'Friend'},
//       {id: 4, name: 'Other'},
//     ]}
//   />
// </div>
