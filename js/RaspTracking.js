import React from 'react';
import axios from 'axios';
import './styles/RaspTracking.css';
import { Link } from 'react-router-dom'



class RaspTracking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tracking: false,
      message: ''
    }
  }


  trackAnimals(){
    console.log("tracking")
    this.setState({
      tracking: true
    })
    axios.get('/tracking')
    .then((response) => {
      console.log('TRACKING response',response)
      this.setState({
        tracking: false,
        message: response.data.message
      })
    })
    .catch((error) => {
      this.setState({
        tracking: false,
      })
      console.log("oops", error)
    })
  }


  render() {
        return (
          <div className="tracking-body">
            {this.state.tracking ?
            <div className="running-message"> Animals are running </div> :

            <div className="overall">
              <Link className="link-tag" to={`/raspExperiments/${this.props.match.params.id}/${this.props.match.params.cageId}`}> Back </Link>
              <div className="button-holding">
                <button className="tracking-button" type="button" onClick={() => this.trackAnimals()}> Start tracking </button>
                <div> {this.state.message} </div>
              </div>
            </div>
           }
          </div>
        );
  }
};


export default RaspTracking;
