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
    return (
      this.state.selected ? <Redirect to={`/raspExperiments/${this.props.cage.experimentId}/${this.props.cage.id}`} /> :
        <div className="container-cage">
          <div className="cageDiv" onClick={() => this.setState({ selected: true })}>
            Cage: {this.props.cage.name}
          </div>
        </div>
    );
  }
};

export default RaspCage;
