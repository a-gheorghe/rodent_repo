import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import './styles/RaspCage.css';

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};



class RaspCage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }


  render() {
    console.log('rasp cage this.props', this.props)
    return (
      this.state.selected ? <Redirect to={`/raspExperiments/${this.props.cage.experimentId}/${this.props.cage.name}`} /> :
        <div className="cageDiv" onClick={() => this.setState({ selected: true })}>
          Experiment name: {this.props.expName}
          Cage: {this.props.cage.name}
        </div>
    );
  }
};

export default RaspCage;
