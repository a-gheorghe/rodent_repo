import React from 'react';
import axios from 'axios';
import RaspTreatmentGroup from './RaspTreatmentGroup.js'

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
    axios.get('http://localhost:3000/api/experiment/' + this.props.match.params.id, config).then(response => {
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
          and has the following groups: {this.state.treatmentGroups.map((group) => <RaspTreatmentGroup key={group.id} treatment={group}/>)}
        </div>
    );
  }
};

export default RaspSelectedExp;
