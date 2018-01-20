import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import asyncValidate from './asyncValidate';
import validate from './validate';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;


if (areIntlLocalesSupported(['he', 'HE-il'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/he');
  require('intl/locale-data/jsonp/HE-il');
}


const renderDatePicker = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <DatePicker
    hintText={label}
    errorText={touched && error}
    DateTimeFormat={DateTimeFormat}
    onChange={(temp, date) => input.onChange(date)}
    {...input}
    {...custom}
    locale="he-IL"
    firstDayOfWeek={0}
    formatDate={new DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format}
  />
);


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
  <div>
    <br/>
    <Checkbox
      label={label}
      checked={input.value ? true : false}
      onCheck={input.onChange}
    />
  </div>
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
    if (val.type === "DatePicker"){
      return (<div>
                <Field
                   name={val.name}
                   component={renderDatePicker}
                   label={val.label}
                />
              </div>)
    }
  });
}


const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting, arr } = props;
  return (
    <form onSubmit={handleSubmit}>
      {createFields(arr)}
    </form>
  );
};


export default reduxForm({
  form: 'fromGen', // a unique identifier for this form
  validate
})(MaterialUiForm);
