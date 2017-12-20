import React from 'react';
import axios from 'axios';
import RaspTreatmentGroup from './RaspTreatmentGroup.js'
import './styles/RaspSelectedExp.css';



const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};


class RaspSelectedExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experimentName: '',
      treatmentGroups: []
    };
  }

  componentWillMount() {
    axios.get('http://b577bdfc.ngrok.io/api/experiment/' + this.props.match.params.id, config).then(response => {
      this.setState({
        experimentName: response.data.experiment.name,
        treatmentGroups: response.data.experiment.treatment_groups
      });
    }). catch(error => console.log(error));
  }



  render() {
    return (
        <div>
          This particular experiment is called {this.state.experimentName}
          and has the following groups: {this.state.treatmentGroups.map((group) => <RaspTreatmentGroup key={group.id} expName = {this.state.experimentName} treatment={group}/>)}
        </div>
    );
  }
};

export default RaspSelectedExp;
