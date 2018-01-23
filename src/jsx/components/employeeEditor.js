import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class DialogExampleAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  render() {
    const actions = [
      <FlatButton
        label="ביטול"
        primary={true}
        onClick={() => {
          this.setState({open: false});
        }}
      />
    ];

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <button onClick={this.handleOpen}>
          {this.props.displayButton}
          </button>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={() => {
              this.setState({open: false});
            }}
            autoScrollBodyContent={true}
          >
            {this.props.comp}
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
