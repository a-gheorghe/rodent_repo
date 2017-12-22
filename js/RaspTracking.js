import React from 'react';
import axios from 'axios';
import './styles/RaspTracking.css';
import { Link } from 'react-router-dom'



class RaspTracking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tracking: false,
      message: '',
      animal: '',
      revolutions: '',
      startTime: '',
      endTime: ''
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
      if(response.data.message){
        console.log('button pressed, NOT calling trackanimals again')
        this.setState({
          tracking: false,
          message: 'Button pressed.',
          animal: '',
          revolutions: '',
          startTime: '',
          endTime: ''
          //response.data.message
        })
      } else if(response.data.session_data){
        console.log('calling track animals again')
        this.setState({
          message: 'session data here',
          animal: response.data.session_data.mouseId,
          revolutions: response.data.session_data.revolutions,
          startTime: response.data.session_data.start_time,
          endTime: response.data.session_data.end_time
        })
          this.trackAnimals()

      }
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
            <div className="running-message"> Animals are running {this.state.message}
              <div className="message-text">Last session was:</div>
              <div className="message-text"> Animal: {this.state.animal} </div>
              <div className="message-text"> Revolutions {this.state.revolutions} </div>
              <div className="message-text"> Start time {this.state.startTime} </div>
              <div className="message-text"> End time {this.state.endTime} </div>
            </div> :

            <div className="overall">
              <Link className="link-tag" to={`/raspExperiments/${this.props.match.params.id}/${this.props.match.params.cageId}`}> Back </Link>
              <div className="button-holding">
                <button className="tracking-button" type="button" onClick={() => this.trackAnimals()}> Start tracking </button>
                <div className="message-text"> {this.state.message} </div>
              </div>
            </div>
           }
          </div>
        );
  }
};


export default RaspTracking;
