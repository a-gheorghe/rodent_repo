import React from 'react';
import axios from 'axios';
import './styles/RaspTreatmentGroup.css';
import RaspCage from './RaspCage.js'

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};


class RaspTreatmentGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {

  }

  render() {
    console.log('RaspTreatmentGroup this.props', this.props)
    return (
      <div className="larger-group">
        <div className="treatment-group">
          <div className="treat-title">{this.props.treatment.name} </div>
          <div className="divStyle">
            {this.props.treatment.cages.map((cage) => <RaspCage key={cage.id} expName={this.props.expName} cage={cage}/>)}
          </div>
        </div>
      </div>

    );
  }
};

export default RaspTreatmentGroup;
