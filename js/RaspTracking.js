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


// NO PI TESTING VERSION
// trackAnimals(){
//   console.log("hello")
// }



trackAnimals(){
    console.log("tracking")
    this.setState({
      tracking: true,
      message: 'Program is running'
    })
    axios.get('/tracking')
    .then((response) => {
      if(response.data.message){
        this.setState({
          tracking: false,
          message: '',
          animal: '',
          revolutions: '',
          startTime: '',
          endTime: ''
          //response.data.message
        })
      } else if(response.data.session_data){
        console.log('calling track animals again')
        this.setState({
          message: 'Program is running',
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
            <Link className="link-tag" to={`/raspExperiments/${this.props.match.params.id}/${this.props.match.params.cageId}`}> Back </Link>
            <div>
              <div className="message-text-title">  {this.state.message} </div>
              {this.state.tracking ?
                <div className="form-box">
                  <div className="form-style-3">
                    <form>
                      <fieldset>
                        <legend>Previous Session Info</legend>
                        <label htmlFor="field1"><span>Animal</span><input type="text" className="input-field" name="field1" value={this.state.animal} /></label>
                        <label htmlFor="field2"><span>Time Started </span><input type="email" className="input-field" name="field2" value={this.state.startTime} /></label>
                        <label htmlFor="field3"><span>Time Ended </span><input type="text" className="input-field" name="field3" value={this.state.endTime} /></label>
                        <label htmlFor="field4"><span>Revolutions </span><input type="text" className="input-field" name="field4" value={this.state.revolutions} /></label>
                      </fieldset>
                    </form>
                  </div>
                </div> : <button className="tracking-button" type="button" onClick={() => this.trackAnimals()}> Start Tracking </button> }
              </div>
            </div>
        );
  }
};


export default RaspTracking;
