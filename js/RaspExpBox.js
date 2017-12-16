import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};


class RaspExpBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

// chooseSelected(){
//   this.setState({
//     selected: true
//   })
// }

  render() {
    return (
      this.state.selected ? <Redirect to={`/raspExperiments/${this.props.experiment.id}`} /> :
      <div onClick={() => this.setState({ selected: true })}>
        Experiment ID: {this.props.experiment.id} <br/>
        Experiment Name: {this.props.experiment.name}<br/>
        Experiment Description: {this.props.experiment.description}
      </div>
    );
  }
};

export default RaspExpBox;
