import React from 'react';
import App from '../containers/App.jsx';



export default class Routes extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
      return (
        <div>
          <App state={this.props.state}/>
        </div>
      );
  }
}
