import React from 'react';
import axios from 'axios';
import './styles/RaspTracking.css';


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
    axios.get('/tracking')
    this.setState({
      tracking: true
    })
    .then((response) => {
      console.log(response)
      this.setState({
        tracking: false,
        message: response.data.message
      })
    })
    .catch((error) => {
      console.log("oops", error)
    })
  }


  render() {
        return (
          <div>
            {this.state.tracking ?
            <div> Animals are running </div> :
            <div>
              <button type="button" onClick={() => this.trackAnimals()}> Track Animals </button>
              <div> Last session was:{this.state.message} </div>
            </div> }
          </div>
        );
  }
};


export default RaspTracking;
