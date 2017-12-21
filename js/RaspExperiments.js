import React from 'react';
import axios from 'axios';
import RaspExpBox from './RaspExpBox'
import './styles/RaspExperiments.css';


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
    axios.get('http://4bc7328c.ngrok.io/api/experiments', config).then(response => {
      console.log(response.data, 'Here is response.data')
      this.setState({experiments: response.data})
    }).catch(error => console.log('you have an', error))
  }

  render() {
    return (
      <div className="exp-body">
          <div className="exp-title"> Experiments </div>

          <div className="exp-holders">
              {this.state.experiments.map(exp => (
                <div key={exp.id} className="larger-exp">
                  <div key={exp.id} className="each-exp">
                    <RaspExpBox className="each-exp" key={exp.id} experiment={exp}/>
                  </div>
              </div>
              ))}
          </div>
      </div>
    );
  }
};

export default RaspExperiments;
