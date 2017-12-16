import React from 'react';
import axios from 'axios';
import RaspExpBox from './RaspExpBox'

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};


class RaspExperiments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experiments: []
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3000/api/experiments', config).then(response => {
      console.log(response.data, 'Here is response.data')
      this.setState({experiments: response.data})
    }).catch(error => console.log('you have an', error))
  }

  render() {
    return (
      <div>
        <div>
          Experiments
        </div>
        <div>
          {this.state.experiments.map(exp => (
            <RaspExpBox key={exp.id} experiment={exp}/>
          ))}
        </div>
      </div>
    );
  }
};

export default RaspExperiments;
