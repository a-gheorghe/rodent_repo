import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import './styles/RaspExpBox.css';


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


  render() {
    console.log('inside raspexpbox this.props', this.props)
    return (
      this.state.selected ? <Redirect to={`/raspExperiments/${this.props.experiment.id}`} /> :
        // <div className="box-wrapper">
          <div className="display-box" onClick={() => this.setState({ selected: true })}>
            <b> Experiment Name (ID):</b> <br/> {this.props.experiment.name} ({this.props.experiment.id})<br/><br/>
            <b> Experiment Description: </b> <br/> {this.props.experiment.description}
          </div>
        // </div>
    );
  }
};

export default RaspExpBox;
