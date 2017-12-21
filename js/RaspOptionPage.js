import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './styles/RaspOptionPage.css';
import { Redirect } from 'react-router';

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};



class RaspOptionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animalButton: false,
      trackingButton: false
    }
  }

  addAnimalPage(event){
    console.log('inside add animal', this.props)
    this.setState({
      animalButton: true
    })
  }

  trackAnimalPage(event){
    this.setState({
      trackingButton: true
    })
  }

  render() {
    console.log(this.props)
    if (this.state.animalButton){
      return <Redirect to={`/raspExperiments/${this.props.match.params.id}/${this.props.match.params.cageId}/addAnimals`} />
    }
    if (this.state.trackingButton){
      return <Redirect to={`/raspExperiments/${this.props.match.params.id}/${this.props.match.params.cageId}/trackAnimals`} />
    }
        return (
          <div className="options-body">
              <div className="option-button" onClick={((event) => this.addAnimalPage())}> Add animals </div>
              <div className="option-button" onClick={((event) => this.trackAnimalPage())}> Track running </div>
          </div>
        );
  }
};

export default RaspOptionPage;
