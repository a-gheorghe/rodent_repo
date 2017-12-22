import React from 'react';
import axios from 'axios';
import './styles/RaspTracking.css';
import { Link } from 'react-router-dom'



class RaspTracking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tracking: false,
      message: 'hey',
      animal: '',
      revolutions: '',
      startTime: '',
      endTime: ''
    }
  }


// NO PI TESTING VERSION
trackAnimals(){
  console.log("hello")
}



  // trackAnimals(){
  //   console.log("tracking")
  //   this.setState({
  //     tracking: true
  //   })
  //   axios.get('/tracking')
  //   .then((response) => {
  //     console.log('TRACKING response',response)
  //     if(response.data.message){
  //       console.log('button pressed, NOT calling trackanimals again')
  //       this.setState({
  //         tracking: false,
  //         message: 'Button pressed: Stopped tracking activity.',
  //         animal: '',
  //         revolutions: '',
  //         startTime: '',
  //         endTime: ''
  //         //response.data.message
  //       })
  //     } else if(response.data.session_data){
  //       console.log('calling track animals again')
  //       this.setState({
  //         message: 'session data here',
  //         animal: response.data.session_data.mouseId,
  //         revolutions: response.data.session_data.revolutions,
  //         startTime: response.data.session_data.start_time,
  //         endTime: response.data.session_data.end_time
  //       })
  //         this.trackAnimals()
  //
  //     }
  //   })
  //   .catch((error) => {
  //     this.setState({
  //       tracking: false,
  //     })
  //     console.log("oops", error)
  //   })
  // }
  //

  render() {
        return (
          <div className="tracking-body">
            {this.state.tracking ?

            <div className="running-message"> Animals are running
              <div className="larger-stats-message">
                <div className="stats-message">
                  <div className="message-text-title">Last session was:</div>
                  <div className="result-fields">
                    <div className="message-text"><label className="tracking-label"> Animal:</label> <div className="valueform"> {this.state.animal}</div> </div>
                    <div className="message-text"> <label className="tracking-label"> Revolutions: </label> <div className="valueform"> {this.state.revolutions} </div> </div>
                    <div className="message-text"> <label className="tracking-label"> Start time: </label> <div className="valueform"> {this.state.startTime} </div> </div>
                    <div className="message-text"> <label className="tracking-label"> End time: </label> <div className="valueform"> {this.state.endTime} </div> </div>
                  </div>
                </div>
              </div>
              {this.state.message}
            </div> :

            <div className="overall">
              <Link className="link-tag" to={`/raspExperiments/${this.props.match.params.id}/${this.props.match.params.cageId}`}> Back </Link>
              <div className="button-holding">
                <button className="tracking-button" type="button" onClick={() => this.trackAnimals()}> Start tracking </button>
                <div className="actual-message-text"> {this.state.message} </div>
              </div>
            </div>
           }
          </div>
        );
  }
};


export default RaspTracking;
