import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import showResults from './showResults';
import MaterialUiForm from './MaterialUiForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


import injectTapEventPlugin from 'react-tap-event-plugin';



/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */


 const Arr = `[
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
]`;

class DialogExampleSimple extends React.Component {
  state = {
    open: false,
    arr: JSON.parse(Arr),
    style: {direction:'ltr'},
    valid: true
  };

  handleOpen = () => {
    if (this.state.valid) {
      this.setState({open: true});
    }
  };

  handleClose = () => {
    this.setState({open: false});
  };
  onChange = (event, value) => {
    try {
      let arr = JSON.parse(value)
      this.setState({
        valid: true,
        arr: arr,
        style:{
         direction:'ltr'
      }});
    } catch (e) {
      this.setState({
        valid: false,
        style:{
         direction:'ltr',
         backgroundColor: '#ffd699'
      }});
    }

  };


  componentWillMount(){
      injectTapEventPlugin();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
      <TextField
        hintText="מערך"
        floatingLabelText="מערך"
        multiLine={true}
        defaultValue={Arr}
        onChange={this.onChange}
        inputStyle = {this.state.style}
      />
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
            <div style={{ padding: 15 }}>
              <h2>Material UI Example</h2>
              <MaterialUiForm arr={this.state.arr} onSubmit={showResults} />
            </div>
        </Dialog>
      </div>
      </MuiThemeProvider>
      </Provider>
    );
  }
}



ReactDom.render(<DialogExampleSimple/>,
                              document.getElementById('root'));
